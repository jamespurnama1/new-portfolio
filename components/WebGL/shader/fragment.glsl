uniform float time;
uniform float progress;
uniform float distanceFromCenter;
uniform sampler2D texture1;
uniform float sat;
uniform vec2 textureSize;
uniform float opacity;
varying vec2 vUv;
float PI = 3.141592653589793238;

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
  // Calculate aspect ratios
  float meshAspect = 1.5;
  float texAspect = textureSize.x / textureSize.y;

  // Adjust UVs for aspect fill
  vec2 uv = vUv - vec2(0.5);
  if (meshAspect < texAspect) {
      uv = uv * vec2(meshAspect / texAspect, 1.0);
  } else {
      uv = uv * vec2(1.0, texAspect / meshAspect);
  }

  uv += vec2(0.5);

  // Sample the texture with the adjusted UVs
  vec4 t = texture2D(texture1, uv);

  // Apply saturation adjustment
  vec3 tFiltered = rgb2hsv(t.rgb);
  tFiltered.y *= sat;
  t.rgb = hsv2rgb(tFiltered);

  // Set the fragment color with adjusted opacity
  gl_FragColor = vec4(t.rgb, t.a * opacity);
}