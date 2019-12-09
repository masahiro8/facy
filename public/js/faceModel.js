function drawFaceMask(points, shift, boxWidth, boxHeight, textureImg) {
  console.log("points", points);
  console.log("shift", shift);
  console.log(boxWidth, boxHeight);

  //中点を求める
  const getMidPoint = (startPoint, endPoint) => {
    let newPoint = {};
    newPoint.x = (startPoint.x + endPoint.x) / 2;
    newPoint.y = (startPoint.y + endPoint.y) / 2;
    return newPoint;
  };
  //鼻の右端から目の下側、輪郭への中点をpointsに追加
  points.push(getMidPoint(points[31], points[27]));
  points.push(getMidPoint(points[31], points[39]));
  points.push(getMidPoint(points[31], points[40]));
  points.push(getMidPoint(points[31], points[41]));
  points.push(getMidPoint(points[31], points[36]));
  points.push(getMidPoint(points[31], points[0]));
  points.push(getMidPoint(points[31], points[1]));
  points.push(getMidPoint(points[31], points[2]));
  points.push(getMidPoint(points[31], points[3]));
  //鼻の左端から目の下側、輪郭への中点をpointsに追加
  points.push(getMidPoint(points[35], points[27]));
  points.push(getMidPoint(points[35], points[42]));
  points.push(getMidPoint(points[35], points[47]));
  points.push(getMidPoint(points[35], points[46]));
  points.push(getMidPoint(points[35], points[45]));
  points.push(getMidPoint(points[35], points[16]));
  points.push(getMidPoint(points[35], points[15]));
  points.push(getMidPoint(points[35], points[14]));
  points.push(getMidPoint(points[35], points[13]));

  //左右の目と鼻の三角形の中心を求める
  const centerPoint = {
    x: (points[39].x + points[42].x + points[30].x) / 3,
    y: (points[39].y + points[42].y + points[30].y) / 3
  };

  for (let i = 0; i < points.length; i++) {
    points[i].z = 0;
  }

  //シェーダー
  SHADER_LOADER.load(
    // ロード完了後
    function(data) {
      // 頂点シェーダー
      let vs = data.myShader.vertex;
      // フラグメントシェーダー
      let fs = data.myShader.fragment;
      init(vs, fs, points);
    }
  );

  function init(vs, fs, points) {
    // サイズを取得
    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#face"),
      antialias: true,
      //描画背景を透明にする
      alpha: true
    });
    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    // const camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
    const camera = new THREE.OrthographicCamera(
      -w / 2,
      w / 2,
      h / 2,
      -h / 2,
      -500,
      500
    );
    // camera.position.set(0, 0, 1);
    camera.lookAt(scene.position);

    //軸オブジェクトの生成
    let axis = new THREE.AxesHelper(100);
    //軸オブジェクトのシーンへの追加
    // scene.add(axis);
    //軸オブジェクトの位置座標を設定
    axis.position.set(0, 0, 0);

    let n = 128; //三角形の数
    let v = 86; //頂点数
    let indexes = new Uint32Array(n * 3); //インデックス配列
    let positions = new Float32Array(v * 3); //頂点座標
    let colors = new Float32Array(v * 3); //頂点色
    let normals = new Float32Array(v * 3); //頂点法線
    var uvs = new Float32Array(v * 2); //uv座標

    for (let i = 0; i < points.length; i++) {
      positions[i * 3] = points[i].x - centerPoint.x;
      positions[i * 3 + 1] = -(points[i].y - centerPoint.y);
      // positions[i * 3] = points[i].x;
      // positions[i * 3 + 1] = -points[i].y;
      positions[i * 3 + 2] = points[i].z;

      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 1.0;
      colors[i * 3 + 2] = 1.0;

      normals[i * 3] = 0.0;
      normals[i * 3 + 1] = 0.0;
      normals[i * 3 + 2] = 1.0;
    }

    //----------
    // ポリゴン
    //----------
    //三角形１
    indexes[0] = 0;
    indexes[1] = 36;
    indexes[2] = 17;
    //三角形２
    indexes[3] = 17;
    indexes[4] = 36;
    indexes[5] = 18;

    indexes[6] = 18;
    indexes[7] = 36;
    indexes[8] = 37;

    indexes[9] = 18;
    indexes[10] = 37;
    indexes[11] = 19;

    indexes[12] = 19;
    indexes[13] = 37;
    indexes[14] = 38;

    indexes[15] = 19;
    indexes[16] = 38;
    indexes[17] = 20;

    indexes[18] = 20;
    indexes[19] = 38;
    indexes[20] = 39;

    indexes[21] = 20;
    indexes[22] = 39;
    indexes[23] = 21;

    indexes[24] = 21;
    indexes[25] = 39;
    indexes[26] = 27;

    indexes[27] = 21;
    indexes[28] = 27;
    indexes[29] = 22;

    indexes[30] = 22;
    indexes[31] = 27;
    indexes[32] = 42;

    indexes[33] = 22;
    indexes[34] = 42;
    indexes[35] = 23;

    indexes[33] = 22;
    indexes[34] = 42;
    indexes[35] = 23;

    indexes[36] = 23;
    indexes[37] = 42;
    indexes[38] = 43;

    indexes[39] = 23;
    indexes[40] = 43;
    indexes[41] = 24;

    indexes[42] = 24;
    indexes[43] = 43;
    indexes[44] = 44;

    indexes[45] = 24;
    indexes[46] = 44;
    indexes[47] = 25;

    indexes[48] = 25;
    indexes[49] = 44;
    indexes[50] = 45;

    indexes[51] = 25;
    indexes[52] = 45;
    indexes[53] = 26;

    indexes[54] = 26;
    indexes[55] = 45;
    indexes[56] = 16;

    indexes[57] = 16;
    indexes[58] = 82;
    indexes[59] = 15;

    indexes[60] = 16;
    indexes[61] = 45;
    indexes[62] = 82;

    indexes[63] = 45;
    indexes[64] = 46;
    indexes[65] = 82;

    indexes[66] = 46;
    indexes[67] = 81;
    indexes[68] = 82;

    indexes[69] = 46;
    indexes[70] = 47;
    indexes[71] = 81;

    indexes[72] = 47;
    indexes[73] = 80;
    indexes[74] = 81;

    indexes[75] = 47;
    indexes[76] = 79;
    indexes[77] = 80;

    indexes[78] = 47;
    indexes[79] = 42;
    indexes[80] = 79;

    indexes[81] = 42;
    indexes[82] = 78;
    indexes[83] = 79;

    indexes[84] = 42;
    indexes[85] = 77;
    indexes[86] = 78;

    indexes[87] = 42;
    indexes[88] = 27;
    indexes[89] = 77;

    indexes[90] = 27;
    indexes[91] = 28;
    indexes[92] = 77;

    indexes[93] = 28;
    indexes[94] = 29;
    indexes[95] = 77;

    indexes[96] = 27;
    indexes[97] = 68;
    indexes[98] = 28;

    indexes[99] = 28;
    indexes[100] = 68;
    indexes[101] = 29;

    indexes[102] = 27;
    indexes[103] = 39;
    indexes[104] = 68;

    indexes[105] = 39;
    indexes[106] = 69;
    indexes[107] = 68;

    indexes[108] = 39;
    indexes[109] = 70;
    indexes[110] = 69;

    indexes[111] = 39;
    indexes[112] = 40;
    indexes[113] = 70;

    indexes[114] = 40;
    indexes[115] = 71;
    indexes[116] = 70;

    indexes[117] = 40;
    indexes[118] = 72;
    indexes[119] = 71;

    indexes[120] = 40;
    indexes[121] = 41;
    indexes[122] = 72;

    indexes[123] = 41;
    indexes[124] = 73;
    indexes[125] = 72;

    indexes[126] = 41;
    indexes[127] = 36;
    indexes[128] = 73;

    indexes[129] = 36;
    indexes[130] = 0;
    indexes[131] = 73;

    indexes[132] = 0;
    indexes[133] = 1;
    indexes[134] = 73;

    indexes[135] = 1;
    indexes[136] = 2;
    indexes[137] = 74;

    indexes[138] = 73;
    indexes[139] = 1;
    indexes[140] = 74;

    indexes[141] = 74;
    indexes[142] = 2;
    indexes[143] = 75;

    indexes[144] = 74;
    indexes[145] = 75;
    indexes[146] = 31;

    indexes[147] = 73;
    indexes[148] = 74;
    indexes[149] = 31;

    indexes[150] = 72;
    indexes[151] = 73;
    indexes[152] = 31;

    indexes[153] = 71;
    indexes[154] = 72;
    indexes[155] = 31;

    indexes[156] = 70;
    indexes[157] = 71;
    indexes[158] = 31;

    indexes[159] = 69;
    indexes[160] = 70;
    indexes[161] = 31;

    indexes[162] = 68;
    indexes[163] = 69;
    indexes[164] = 31;

    indexes[165] = 29;
    indexes[166] = 68;
    indexes[167] = 31;

    indexes[168] = 30;
    indexes[169] = 29;
    indexes[170] = 31;

    indexes[171] = 31;
    indexes[172] = 32;
    indexes[173] = 30;

    indexes[174] = 32;
    indexes[175] = 33;
    indexes[176] = 30;

    indexes[177] = 33;
    indexes[178] = 34;
    indexes[179] = 30;

    indexes[180] = 34;
    indexes[181] = 35;
    indexes[182] = 30;

    indexes[183] = 35;
    indexes[184] = 29;
    indexes[185] = 30;

    indexes[186] = 35;
    indexes[187] = 77;
    indexes[188] = 29;

    indexes[189] = 35;
    indexes[190] = 78;
    indexes[191] = 77;

    indexes[192] = 35;
    indexes[193] = 79;
    indexes[194] = 78;

    indexes[195] = 35;
    indexes[196] = 80;
    indexes[197] = 79;

    indexes[198] = 35;
    indexes[199] = 81;
    indexes[200] = 80;

    indexes[201] = 35;
    indexes[202] = 82;
    indexes[203] = 81;

    indexes[204] = 35;
    indexes[205] = 83;
    indexes[206] = 82;

    indexes[207] = 35;
    indexes[208] = 84;
    indexes[209] = 83;

    indexes[210] = 82;
    indexes[211] = 83;
    indexes[212] = 15;

    indexes[213] = 83;
    indexes[214] = 14;
    indexes[215] = 15;

    indexes[216] = 83;
    indexes[217] = 84;
    indexes[218] = 14;

    indexes[219] = 14;
    indexes[220] = 84;
    indexes[221] = 13;

    indexes[222] = 13;
    indexes[223] = 84;
    indexes[224] = 85;

    indexes[225] = 84;
    indexes[226] = 35;
    indexes[227] = 85;

    indexes[228] = 13;
    indexes[229] = 85;
    indexes[230] = 54;

    indexes[231] = 13;
    indexes[232] = 54;
    indexes[233] = 12;

    indexes[234] = 85;
    indexes[235] = 35;
    indexes[236] = 54;

    indexes[237] = 54;
    indexes[238] = 35;
    indexes[239] = 53;

    indexes[240] = 53;
    indexes[241] = 35;
    indexes[242] = 34;

    indexes[243] = 53;
    indexes[244] = 34;
    indexes[245] = 52;

    indexes[246] = 52;
    indexes[247] = 34;
    indexes[248] = 33;

    indexes[249] = 52;
    indexes[250] = 33;
    indexes[251] = 51;

    indexes[252] = 51;
    indexes[253] = 33;
    indexes[254] = 50;

    indexes[255] = 50;
    indexes[256] = 33;
    indexes[257] = 32;

    indexes[258] = 50;
    indexes[259] = 32;
    indexes[260] = 49;

    indexes[261] = 49;
    indexes[262] = 32;
    indexes[263] = 31;

    indexes[264] = 49;
    indexes[265] = 31;
    indexes[266] = 48;

    indexes[267] = 48;
    indexes[268] = 31;
    indexes[269] = 76;

    indexes[270] = 76;
    indexes[271] = 31;
    indexes[272] = 75;

    indexes[273] = 3;
    indexes[274] = 75;
    indexes[275] = 2;

    indexes[276] = 3;
    indexes[277] = 76;
    indexes[278] = 75;

    indexes[279] = 3;
    indexes[280] = 48;
    indexes[281] = 76;

    indexes[282] = 3;
    indexes[283] = 4;
    indexes[284] = 48;

    indexes[285] = 48;
    indexes[286] = 61;
    indexes[287] = 49;

    indexes[288] = 61;
    indexes[289] = 50;
    indexes[290] = 49;

    indexes[291] = 61;
    indexes[292] = 62;
    indexes[293] = 50;

    indexes[294] = 62;
    indexes[295] = 51;
    indexes[296] = 50;

    indexes[297] = 62;
    indexes[298] = 63;
    indexes[299] = 51;

    indexes[300] = 63;
    indexes[301] = 52;
    indexes[302] = 51;

    indexes[303] = 63;
    indexes[304] = 64;
    indexes[305] = 52;

    indexes[306] = 64;
    indexes[307] = 53;
    indexes[308] = 52;

    indexes[309] = 64;
    indexes[310] = 54;
    indexes[311] = 53;

    indexes[312] = 54;
    indexes[313] = 65;
    indexes[314] = 55;

    indexes[315] = 55;
    indexes[316] = 65;
    indexes[317] = 56;

    indexes[318] = 56;
    indexes[319] = 65;
    indexes[320] = 57;

    indexes[321] = 57;
    indexes[322] = 65;
    indexes[323] = 66;

    indexes[324] = 57;
    indexes[325] = 66;
    indexes[326] = 58;

    indexes[327] = 58;
    indexes[328] = 66;
    indexes[329] = 67;

    indexes[330] = 58;
    indexes[331] = 67;
    indexes[332] = 59;

    indexes[333] = 59;
    indexes[334] = 67;
    indexes[335] = 60;

    indexes[336] = 60;
    indexes[337] = 67;
    indexes[338] = 48;

    indexes[339] = 48;
    indexes[340] = 4;
    indexes[341] = 5;

    indexes[342] = 5;
    indexes[343] = 60;
    indexes[344] = 48;

    indexes[345] = 5;
    indexes[346] = 6;
    indexes[347] = 60;

    indexes[348] = 6;
    indexes[349] = 59;
    indexes[350] = 60;

    indexes[351] = 6;
    indexes[352] = 7;
    indexes[353] = 59;

    indexes[354] = 7;
    indexes[355] = 58;
    indexes[356] = 59;

    indexes[357] = 7;
    indexes[358] = 8;
    indexes[359] = 58;

    indexes[360] = 8;
    indexes[361] = 57;
    indexes[362] = 58;

    indexes[363] = 8;
    indexes[364] = 9;
    indexes[365] = 57;

    indexes[366] = 9;
    indexes[367] = 56;
    indexes[368] = 57;

    indexes[369] = 9;
    indexes[370] = 10;
    indexes[371] = 56;

    indexes[372] = 10;
    indexes[373] = 55;
    indexes[374] = 56;

    indexes[375] = 10;
    indexes[376] = 11;
    indexes[377] = 55;

    indexes[378] = 11;
    indexes[379] = 54;
    indexes[380] = 55;

    indexes[381] = 11;
    indexes[382] = 12;
    indexes[383] = 54;

    //TODO テクスチャが上下逆さま。要修正。
    const uvsCoord = [
      0.01,
      0.24,
      0.02,
      0.38,
      0.04,
      0.52,
      0.08,
      0.64,
      0.12,
      0.76,
      0.18,
      0.86,
      0.26,
      0.92,
      0.36,
      0.96,
      0.5,
      0.98,
      0.64,
      0.96,
      0.74,
      0.92,
      0.82,
      0.86,
      0.88,
      0.76,
      0.92,
      0.64,
      0.96,
      0.52,
      0.98,
      0.38,
      0.99,
      0.24,
      0.08,
      0.1,
      0.15,
      0.04,
      0.22,
      0.01,
      0.3,
      0.01,
      0.38,
      0.04,
      0.62,
      0.04,
      0.7,
      0.01,
      0.78,
      0.01,
      0.85,
      0.04,
      0.92,
      0.1,
      0.5,
      0.18,
      0.5,
      0.26,
      0.5,
      0.34,
      0.5,
      0.42,
      0.43,
      0.48,
      0.46,
      0.49,
      0.5,
      0.5,
      0.54,
      0.49,
      0.57,
      0.48,
      0.2,
      0.2,
      0.26,
      0.16,
      0.32,
      0.16,
      0.38,
      0.2,
      0.32,
      0.24,
      0.26,
      0.24,
      0.62,
      0.2,
      0.68,
      0.16,
      0.74,
      0.16,
      0.8,
      0.2,
      0.74,
      0.24,
      0.68,
      0.24,
      0.32,
      0.68,
      0.39,
      0.63,
      0.45,
      0.6,
      0.5,
      0.62,
      0.55,
      0.6,
      0.61,
      0.63,
      0.68,
      0.68,
      0.64,
      0.71,
      0.59,
      0.74,
      0.53,
      0.76,
      0.47,
      0.76,
      0.41,
      0.74,
      0.36,
      0.71,
      0.41,
      0.66,
      0.47,
      0.65,
      0.53,
      0.65,
      0.59,
      0.66,
      0.55,
      0.69,
      0.5,
      0.7,
      0.45,
      0.69,
      0.45,
      0.34,
      0.38,
      0.34,
      0.35,
      0.35,
      0.32,
      0.35,
      0.29,
      0.34,
      0.2,
      0.36,
      0.21,
      0.43,
      0.22,
      0.5,
      0.24,
      0.56,
      0.55,
      0.34,
      0.62,
      0.34,
      0.65,
      0.35,
      0.68,
      0.35,
      0.71,
      0.34,
      0.8,
      0.36,
      0.79,
      0.43,
      0.78,
      0.5,
      0.76,
      0.56
    ];

    // 各頂点のテクスチャ座標
    for (let i = 0; i < uvsCoord.length; i++) {
      uvs[i] = uvsCoord[i];
    }

    // console.log(positions);
    // console.log(colors);
    const geometry = new THREE.BufferGeometry();
    //attribute変数に登録

    geometry.setIndex(new THREE.BufferAttribute(indexes, 1));

    geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
    // geometry.addAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute("normal", new THREE.BufferAttribute(normals, 3));
    geometry.addAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    //テクスチャの読み込み
    const loader = new THREE.TextureLoader();
    const texture = loader.load("../img/" + textureImg);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    //ユニフォーム型変数の定義
    let uniforms = {
      texture: { type: "t", value: texture }
    };

    //マテリアルの生成
    const material = new THREE.ShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: uniforms,
      blending: THREE.AdditiveBlending,
      depthWrite: true,
      transparent: true,
      side: THREE.DoubleSide
    });

    //オブジェクト生成
    const face = new THREE.Mesh(geometry, material);
    //オブジェクトの位置
    face.position.set(
      -w / 2 + shift.x + centerPoint.x * boxWidth,
      h / 2 - shift.y - centerPoint.y * boxHeight,
      0
    );

    //オブジェクトをシーンへ追加
    scene.add(face);

    tick();

    // 毎フレーム時に実行されるループイベント
    function tick() {
      // face.rotation.y += 0.02;
      renderer.render(scene, camera); // レンダリング
      const sec = performance.now() / 1000;
      requestAnimationFrame(tick);
    }
  }
}
