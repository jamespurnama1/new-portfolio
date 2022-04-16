#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform vec3 uColor;
uniform vec3 uLightColor;
uniform float uLightIntensity;
uniform float uNoiseScale;
uniform float uNoiseCoef;

varying vec3 vNormal;
varying vec3 vSurfaceToLight;

vec3 light_reflection(vec3 lightColor) {
  // General calculations needed for diffuse lighting
  // AMBIENT is just the light's color
  vec3 ambient = lightColor;

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // DIFFUSE  calculations
  // Calculate the cosine of the angle between the vertex's normal
  // vector and the vector going to the light.
  vec3 diffuse = lightColor * max(dot(vSurfaceToLight, vNormal), 0.0);

  // Combine 
  return (ambient + diffuse);
}

void main(void) {
  vec3 light_value = light_reflection(uLightColor);
  light_value *= uLightIntensity;

  // grain
  vec2 uv = gl_FragCoord.xy;
  uv /= uNoiseScale;

  vec3 colorNoise = vec3(snoise2(uv) * 0.5 + 0.5);
  colorNoise *= pow(light_value.r, uNoiseCoef);

  gl_FragColor.r = max(colorNoise.r, uColor.r);
  gl_FragColor.g = max(colorNoise.g, uColor.g);
  gl_FragColor.b = max(colorNoise.b, uColor.b);
  gl_FragColor.a = 1.0;
}
