import { Vector2 } from 'three'

/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const DotScreenShader = {
  uniforms: {
    tDiffuse: { value: null },
    tSize: { value: new Vector2(256, 256) },
    center: { value: new Vector2(0.5, 0.5) },
    angle: { value: 1.57 },
    scale: { value: 1.0 },
  },

  vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

  fragmentShader: /* glsl */ `

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}

    float random(vec2 p) {
      vec2 k1 = vec2(
        23.14069263277926, // e^pi (Gelfond's constant)
        2.66514414690225 // 2^sqrt(2) (Gelfon-Schneider constant)
      );
      return fract(
        cos(dot(p, k1)) * 12345.6789
      );
    }

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

      vec2 uvRandom = vUv;
      uvRandom.y *= random(vec2(uvRandom.y, 0.4));

      color.rgb += random(uvRandom) * 0.15;

			float average = ( color.r + color.g + color.b ) / 3.0;

			// gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );

      gl_FragColor = color;

		}`,
}

export { DotScreenShader }
