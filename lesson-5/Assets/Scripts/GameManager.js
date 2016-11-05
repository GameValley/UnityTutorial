#pragma strict

var ball : Transform;
var floor : Transform;


function Start () {
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
}

function Update () {
  if (Input.GetMouseButtonDown(0)) {
    // Get a ray at the click position 
    var hit: RaycastHit;
    var ray = Camera.main.ScreenPointToRay(Input.mousePosition);

    // Destroy the ball being clicked
    if (Physics.Raycast(ray, hit)) {
      Destroy(hit.transform.gameObject);
    }
  }
}