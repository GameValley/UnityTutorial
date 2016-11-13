#pragma strict

var topWall : Transform;
var bottomWall : Transform;
var leftWall : Transform;
var rightWall : Transform;
var background : Transform;
var paddle : Transform;
var ball : Transform;
var paddleSpeed = 1.0f;

private var topRight : Vector2;
private var bottomLeft : Vector2;
private var start = false;

function Awake () {
  topRight = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, Screen.height, 0));
  bottomLeft = Camera.main.ScreenToWorldPoint(new Vector3(0, 0, 0));

  // Adjust the positions of the border walls
  leftWall.position.x = bottomLeft.x - leftWall.localScale.x / 2;
  rightWall.position.x = topRight.x + rightWall.localScale.x / 2;
  topWall.position.y = topRight.y + topWall.localScale.y / 2;
  bottomWall.position.y = bottomLeft.y - bottomWall.localScale.y / 2;
  background.localScale.x = topRight.x - bottomLeft.x;
  background.localScale.y = topRight.y - bottomLeft.y;
  paddle.position.x = 0;
  paddle.position.y = bottomLeft.y + paddle.lossyScale.y / 2;
}

function Start () {

}

function Update () {
  var xPos = paddle.position.x + (Input.GetAxis("Horizontal") * paddleSpeed);
  paddle.position.x = Mathf.Clamp (xPos, bottomLeft.x+paddle.lossyScale.x/2, topRight.x-paddle.lossyScale.x/2);

  if (Input.GetKey(KeyCode.UpArrow) && start == false) {
    ball.position.x = paddle.position.x;
    ball.position.y = paddle.position.y + paddle.lossyScale.y/2 + ball.lossyScale.y/2;
    var randomAngle = Quaternion.Euler(0, 0, Random.Range(30,46)*(Random.Range(0,2)*2-1));
    ball.gameObject.GetComponent.<Rigidbody>().AddForce(randomAngle*Vector3(0.0f, 600.0f, 0.0f));
    start = true;
  }
}