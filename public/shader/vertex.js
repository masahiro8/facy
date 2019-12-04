//頂点データの宣言
attribute vec3 color;
//受け渡し変数の宣言
varying vec3 vColor;
varying vec2 vUv;
void main()	{
  //頂点色を受け渡す
  vColor = color;
  //テクスチャ座標を受け渡す
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
