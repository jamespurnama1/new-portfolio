uniform float time;
uniform float progress;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform float sat;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

//NOISE
float mod289(float x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x) {return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
  vec3 a = floor(p);
  vec3 d = p - a;
  d = d * d * (3.0 - 2.0 * d);

  vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
  vec4 k1 = perm(b.xyxy);
  vec4 k2 = perm(k1.xyxy + b.zzww);

  vec4 c = k2 + a.zzzz;
  vec4 k3 = perm(c);
  vec4 k4 = perm(c + 1.0);

  vec4 o1 = fract(k3 * (1.0 / 41.0));
  vec4 o2 = fract(k4 * (1.0 / 41.0));

  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

  return o4.y * d.y + o4.x * (1.0 - d.y);
}

float lines(vec2 uv, float offset) {
  return smoothstep(
    0.0, 0.5 + offset * 0.5,
    0.5 * abs((sin(uv.x * 30.0) + offset * 2.0))
  );
}

mat2 rotate2D(float angle) {
  return mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
    );
}

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  float n = noise(vPosition + time);
  // vec3 baseFirst = vec3(color1[0]/255., 158./255., 113./255.);
  // vec3 accent = vec3(0., 0., 0.);
  // vec3 baseSecond = vec3(224./255., 148./255., 66./255.);
  // vec3 baseThird = vec3(232./255., 201./255., 73./255.);

  vec2 baseUV = rotate2D(n) * vPosition.xy * 0.1;
  float basePattern = lines(baseUV, 0.5);
  float secondPattern = lines(baseUV, 0.1);

  vec3 baseColor = mix(color2, color1, basePattern);
  vec3 secondBaseColor = mix(baseColor, color3, secondPattern);

  vec4 t = vec4(vec3(secondBaseColor), 1.0);

  vec3 tFiltered = rgb2hsv(t.rgb);
  tFiltered.y *= sat;
  t.rgb = hsv2rgb(tFiltered);
  gl_FragColor = t;
}
