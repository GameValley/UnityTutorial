#pragma strict

// It should link to prefab Ball object in Unity Editor
public var ball : Rigidbody;
public var leftWall : Transform;
public var rightWall : Transform;
public var topWall : Transform;
public var bottomWall : Transform;


function Start () {
  // Disable screen dimming
  Screen.sleepTimeout = SleepTimeout.NeverSleep;

  // stageDimensions is the coordinates of the top-right corner. Camera must be in the origin (0, 0).
  var stageDimensions = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, Screen.height, 0));

  // Adjust the positions of the border walls
  leftWall.position.x = - stageDimensions.x - leftWall.localScale.x / 2;
  rightWall.position.x = stageDimensions.x + rightWall.localScale.x / 2;
  topWall.position.y = stageDimensions.y + topWall.localScale.y / 2;
  bottomWall.position.y = - stageDimensions.y - bottomWall.localScale.y / 2;
}

function Update() {
  // Check if left mouse button is clicked
  if (Input.GetMouseButtonDown(0)) {
    // Get the clicked position
    AddBall(Input.mousePosition);
  }
  // Check if screen is touched
  for (var i: int = 0; i < Input.touchCount; ++i) {
    if (Input.GetTouch(i).phase == TouchPhase.Began) {
      AddBall(Input.GetTouch(i).position);
	}
  }
}

function FixedUpdate() {
  var accel = Input.acceleration.normalized;
  accel.z = 0.0f;

  if (accel != Vector3.zero) {
    Physics.gravity = 9.8 * accel;
  }
}

function AddBall(pos: Vector3) {

    // Get a ray at the click position 
    var hit: RaycastHit;
    var ray = Camera.main.ScreenPointToRay(pos);

    // If the ray doesn't hit anything
    if (!Physics.Raycast(ray, hit)) {
      // A list of colors to be used by randomizer
      var colors = [Color.green, Color.red, Color.blue];
       
      // Covert the screen position to the world position
      pos = Camera.main.ScreenToWorldPoint(pos);

      // This is 2D game. All objects are at z=0.
      pos.z = 0.0f;

      // Create an instance to the prefab Ball
      var instance : Rigidbody;
      instance = Instantiate(ball, pos, Quaternion.identity);
	
	  // Instantiate() returns a Rigidbody. Need to get the GameObject and then find its Renderer.
	  // So the color can be set.
	  instance.gameObject.GetComponent.<Renderer>().material.color = colors[Random.Range(0, colors.length)];
    }
}