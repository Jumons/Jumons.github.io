
//------------------------------------------------
// 定数
//------------------------------------------------
var BALL_RADIUS = 8;	// ボールの半径

var BAR_WIDTH = 64;		// バーの幅
var BAR_HEIGHT = 16;	// バーの高さ

var BLOCK_WIDTH = 32;	// ブロックの幅
var BLOCK_HEIGHT = 16;	// ブロックの高さ
var BLOCK_ROW = 4;		// ブロックの行数
var BLOCK_COL = 8;		// ブロックの列数
var BLOCK_ROWS_MARGIN = 2;	// ブロック行のマージン
var BLOCK_COLS_MARGIN = 0;	// ブロック列のマージン
var BLOCK_POS = 24;		// 一番左上のブロックのx,y座標

var MARGIN = 16;		// 壁の外のマージン
var WALL_WIDTH = 8;		// 壁の幅

var SPACE_X = 256;		// 空間の横幅
var SPACE_Y = 256;		// 空間の縦幅

var INTERVAL = 1;		// ゲームのフレームインターバル


window.onload = function() {
	// 壁の配置
	document.getElementById( "lyrwall" ).style = 
		"position: absolute; left:" + MARGIN + "px; top:" + MARGIN + "px;";

	// ボールの配置
	var temp1 = MARGIN + WALL_WIDTH + SPACE_X / 2 - BALL_RADIUS;
	var temp2 = MARGIN + WALL_WIDTH + SPACE_Y / 2 - BALL_RADIUS;
	document.getElementById( "lyrball" ).style = 
		"position: absolute; left:" + temp1 + "px; top:" + temp2 + "px;";

	// バーの配置
	temp1 = MARGIN + WALL_WIDTH + SPACE_X / 2 - BAR_WIDTH / 2;
	temp2 = MARGIN + WALL_WIDTH + SPACE_Y - BAR_HEIGHT 
	document.getElementById( "lyrbar" ).style = 
		"position: absolute; left:" + temp1 + "px; top:" + temp2 + "px;";

	// ブロックの配置
	var template = document.querySelector('#btemplate');
	for (var i = 0; i < BLOCK_ROW; i++) {
		for (var j = 0; j < BLOCK_COL; j++) {
			var num = j + i * BLOCK_COL;	// ブロックの番号
			var bw = (i + j) % 2;			// ブロックの色
			// templateのDIVにIDを付ける
			var objDiv = template.content.querySelector('.blocks'); 
			// classで項目を特定しIDを付ける
			objDiv.setAttribute("id", "lyrblock" + num);

			template.content.querySelector('img').src = 'bb00' + (4+bw) + '.gif';

			var temp1 = BLOCK_POS + j * (BLOCK_WIDTH + BLOCK_COLS_MARGIN);
			var temp2 = BLOCK_POS + i * (BLOCK_HEIGHT + BLOCK_ROWS_MARGIN);
			template.content.querySelector('div').style = "position: absolute; left:" + temp1 + "px; top:" + temp2 + "px;";

			var clone = document.importNode(template.content, true);
			document.body.appendChild(clone);
		}
	}
};

//------------------------------------------------
// コールバック初期設定
//------------------------------------------------
var timerID;

//--------------------------------------------------
// ボール座標変数
//--------------------------------------------------
var ballx;	// ボールのＸ(左)座標
var bally;	// ボールのＹ(上)座標

//--------------------------------------------------
// ボール速度変数
//--------------------------------------------------
var speedx;	// ボールのＸ(左)方向の速度
var speedy;	// ボールのＹ(上)方向の速度

//--------------------------------------------------
// バー座標変数
//--------------------------------------------------
var barx;	// バーのＸ(左)座標
var bary;	// バーのＹ(上)座標

//--------------------------------------------------
// マウス座標変数
//--------------------------------------------------
var mousex;	// マウスＸ座標
var mousey;	// マウスＹ座標

//--------------------------------------------------
// ブロックのカウンター
//--------------------------------------------------
var blockCount = BLOCK_ROW * BLOCK_COL;


function lyrSetVisibility( lyr, visf ) {
	if( visf ) {
		document.getElementById( lyr ).style.visibility = "visible";
	} else {
		document.getElementById( lyr ).style.visibility = "hidden";
	}
}

//--------------------------------------------------
// レイヤーの位置指定
//	lyr = レイヤー名
//	(x,y) = 位置
//--------------------------------------------------
function lyrSetPos( lyr , x , y ) {
	document.getElementById( lyr ).style.left = x;
	document.getElementById( lyr ).style.top  = y;
}

//--------------------------------------------------
// レイヤーの座標取得
//	lyr = レイヤー名
//--------------------------------------------------
// 左
function lyrGetLeft( lyr ) {
	return( parseInt( document.getElementById( lyr ).style.left ) );
	return( 0 );
}
// 上
function lyrGetTop( lyr ) {
	return( parseInt( document.getElementById( lyr ).style.top ) );
	return( 0 );
}

//------------------------------------------------
// ボールとブロックの当たり判定
//	lyr = ブロックレイヤー名
//------------------------------------------------
function hitchkBlock( lyr ) {
	if( document.getElementById( lyr ) == null ) return false;
	var x = lyrGetLeft( lyr );
	var y = lyrGetTop( lyr );
	var flag = false;
	if (   ( bally + BALL_RADIUS * 2 >= y )
		&& ( bally + BALL_RADIUS * 2 <= y + BLOCK_HEIGHT / 2 )
		&& ( ballx + BALL_RADIUS >= x )
		&& ( ballx + BALL_RADIUS <= x + BLOCK_WIDTH )
		&& speedy > 0 ) {	//バー上との当たり判定
		speedy = -speedy;
		// bally -= BLOCK_HEIGHT / 2;
		flag = true;
	}
	if (   ( bally >= y + BLOCK_HEIGHT / 2 )
		&& ( bally <= y + BLOCK_HEIGHT )
		&& ( ballx + BALL_RADIUS >= x )
		&& ( ballx + BALL_RADIUS <= x + BLOCK_WIDTH )
		&& speedy < 0 ) {	//バー下との当たり判定
		speedy = -speedy;
		// bally += BLOCK_HEIGHT / 2;
		flag = true;
	}
	if (   ( ballx >= x + BLOCK_WIDTH / 2 )
		&& ( ballx <= x + BLOCK_WIDTH )
		&& ( bally + BALL_RADIUS >= y )
		&& ( bally + BALL_RADIUS <= y + BLOCK_HEIGHT )
		&& speedx < 0 ) {	//バー右との当たり判定
		speedx = -speedx;
		flag = true;
	}
	if (   ( ballx + BALL_RADIUS * 2 >= x )
		&& ( ballx + BALL_RADIUS * 2 <= x + BLOCK_WIDTH / 2 )
		&& ( bally + BALL_RADIUS >= y )
		&& ( bally + BALL_RADIUS <= y + BLOCK_HEIGHT )
		&& speedx > 0 ) {	//バー左との当たり判定
		speedx = -speedx;
		flag = true;
	}

	return flag;

}

//--------------------------------------------------
// マウス座標取得コールバック関数
//--------------------------------------------------
function evMouseMove(e) {
	mousex = e.pageX;
	mousey = e.pageY;
}


function gameStart() {		// 自分で関数を定義
	alert("ゲーム開始！");	// JavaScript定義されている関数の呼び出し
	gameInit();				// 初期化 (下記で定義されている自作関数の呼び出し)
	gameBody();				// 本体 (下記で定義されている自作関数の呼び出し)
}

function gameInit() {
	// コールバック登録
	document.onmousemove=evMouseMove;	//マウスを動かすとevMouseMove()を起動
	document.captureEvents(Event.MOUSEMOVE);

	ballx = lyrGetLeft( "lyrball" );	// ballx にレイヤーのＸ座標を代入
	bally = lyrGetTop( "lyrball" );		// bally にレイヤーのＹ座標を代入

	barx = lyrGetLeft( "lyrbar" );		// barx にレイヤーのＸ座標を代入
	bary = lyrGetTop( "lyrbar" );		// bary にレイヤーのＹ座標を代入

	// 初期速度設定
	speedx = 1.0;	// 右へ
	speedy = 0.7;	// 下へ
}

function gameBody() {
	clearTimeout( timerID );	// タイマークリア

	barx = mousex - BAR_WIDTH / 2;
	// bary = mousey - BAR_HEIGHT / 2;
	bary = MARGIN + WALL_WIDTH + SPACE_Y - BAR_HEIGHT*2;

	ballx += speedx;
	bally += speedy;

	if( barx < MARGIN + WALL_WIDTH ) {	// 左壁をはみ出さないように
		barx = MARGIN + WALL_WIDTH;
	}
	if( bary < MARGIN + WALL_WIDTH ) {	// 上壁をはみ出さないように
		bary = MARGIN + WALL_WIDTH;
	}
	if( barx > MARGIN + WALL_WIDTH + SPACE_X - BAR_WIDTH) {	// 右壁をはみ出さないように	
		barx = MARGIN + WALL_WIDTH + SPACE_X - BAR_WIDTH;
	}
	if( bary > MARGIN + WALL_WIDTH + SPACE_Y - BAR_HEIGHT) { // 下壁をはみ出さないように	
		bary = MARGIN + WALL_WIDTH + SPACE_Y - BAR_HEIGHT;
	}

	if ( ballx < MARGIN + WALL_WIDTH ) {	// 左の壁との当たり判定
		speedx = -speedx;   // 右に跳ね返り
		ballx = MARGIN + WALL_WIDTH;
	}
	if ( bally < MARGIN + WALL_WIDTH ) {	// 上の壁との当たり判定
		speedy = -speedy;   // 下に跳ね返り
		bally = MARGIN + WALL_WIDTH;
	}
	if ( ballx > WALL_WIDTH + SPACE_X ) {	// 右の壁との当たり判定
		speedx = -speedx;   // 左に跳ね返り
		ballx = WALL_WIDTH + SPACE_X;
	}
	if ( bally > WALL_WIDTH + SPACE_Y ) {	// 下の壁との当たり判定
		speedy = -speedy;   // 上に跳ね返り
		bally = WALL_WIDTH + SPACE_Y;
	}

	if ( ( bally + BALL_RADIUS * 2 >= bary ) && ( bally + BALL_RADIUS * 2 <= bary + BAR_HEIGHT / 2 ) && ( ballx + BALL_RADIUS >= barx ) && ( ballx + BALL_RADIUS <= barx + BAR_WIDTH ) && speedy > 0 ) {	//バー上との当たり判定
		speedy = -speedy;
		// bally -= BAR_HEIGHT / 2;
	}
	if ( ( bally >= bary + BAR_HEIGHT / 2 ) && ( bally <= bary + BAR_HEIGHT ) && ( ballx + BALL_RADIUS >= barx ) && ( ballx + BALL_RADIUS <= barx + BAR_WIDTH ) && speedy < 0 ) {	//バー下との当たり判定
		speedy = -speedy;
		// bally += BAR_HEIGHT / 2;
	}
	if ( ( ballx >= barx + BAR_WIDTH / 2 ) && ( ballx <= barx + BAR_WIDTH ) && ( bally + BALL_RADIUS >= bary ) && ( bally + BALL_RADIUS <= bary + BAR_HEIGHT ) && speedx < 0 ) {	//バー右との当たり判定
		speedx = -speedx;
	}
	if ( ( ballx + BALL_RADIUS * 2 >= barx ) && ( ballx + BALL_RADIUS * 2 <= barx + BAR_WIDTH / 2 ) && ( bally + BALL_RADIUS >= bary ) && ( bally + BALL_RADIUS <= bary + BAR_HEIGHT ) && speedx > 0 ) {	//バー左との当たり判定
		speedx = -speedx;
	}

	for (var i = 0; i < BLOCK_ROW * BLOCK_COL; i++) {
		if( hitchkBlock( "lyrblock" + i ) ) {
			var block = document.getElementById( "lyrblock" + i );
			document.body.removeChild( block );
			blockCount--;
		}
	}

	lyrSetPos( "lyrball" , ballx, bally );
	lyrSetPos( "lyrbar" , barx, bary );

	timerID = setTimeout( "gameBody()" , INTERVAL );	// タイマーで自分を呼んでみる
}











