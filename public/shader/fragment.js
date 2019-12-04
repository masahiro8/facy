//テクスチャデータをuniform変数として受取
uniform sampler2D texture;
//受け渡し変数の宣言
varying vec3 vColor;
varying vec2 vUv;
void main()	{
  vec4 tColor = texture2D(texture, vUv);
  gl_FragColor = tColor;
}
