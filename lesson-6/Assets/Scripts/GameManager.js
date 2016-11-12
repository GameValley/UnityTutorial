#pragma strict

var ball : Transform;
var floor : Transform;
var count : UI.Text;
var timer : UI.Text;


private var start = false;     // flag to indicate start of game
private var start_time = 0;    // Start time in seconds
private var num = 0;           // Total number of balls

function Start () {
  // Generate balls
  var columns = 10;
  var rows = 10;
  var colors = [Color.green, Color.red, Color.blue];

  var pos = Vector3(floor.position.x - Mathf.Floor(columns/2)*ball.localScale.x, 
                    floor.position.y + floor.localScale.y / 2 + ball.localScale.y / 2);

  for (var i=0; i<columns; i++) {
    for (var j=0; j<rows; j++) {
      var ballPos = Vector3(pos.x + i*ball.localScale.x, pos.y + j*ball.localScale.y);
      var instance = Instantiate(ball, ballPos, Quaternion.identity);
      instance.gameObject.GetComponent.<Renderer>().material.color = colors[Random.Range(0, colors.length)];
    }
  }

  // Display the count of balls
  num = columns * rows;
  count.text = num.ToString();
}

function Update () {
  if (start == true) {
    // Calculate and display the elapsed time
    var elapse = Time.time - start_time;
    var minutes = Mathf.Floor(elapse / 60).ToString("00");
    var seconds = (elapse % 60).ToString("00");
    timer.text = minutes.ToString() + ":" + seconds.ToString();

    // Handle mouse click
    if (Input.GetMouseButtonDown(0)) {
      // Get a ray at the click position 
      var hit: RaycastHit;
      var ray = Camera.main.ScreenPointToRay(Input.mousePosition);

      // Destroy the ball being clicked
      if (Physics.Raycast(ray, hit)) {
        Destroy(hit.transform.gameObject);
        num--;
        count.text = num.ToString();
        if (num == 0) {
          start = false;
        }
      }
    }
  }
}

// Handle click event of Start button
function StartOnClick() {
  start = true;
  start_time = Time.time;
}