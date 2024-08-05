varying vec2 v_uv;

void main () {
  // Set the correct position of each plane vertex
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // Pass in the correct UVs to the fragment shader
  v_uv = uv;
}
