varying float positionY;
varying vec2 vUv;

void main() {
  // float strength = positionY + 0.5;
  float strength = vUv.y * 0.3;
  gl_FragColor = vec4(strength, strength, strength, 1.0);
}