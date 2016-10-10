#pragma strict

// It should link to prefab Ball object in Unity Editor
public var ball : Rigidbody;

function Start () {

}

function Update () {
  // Check if left mouse button is clicked
  if (Input.GetMouseButtonDown(0)) {

    // Get the clicked position
    var pos = Input.mousePosition;

    // Get a ray at the click position 
    var hit: RaycastHit;
    var ray = Camera.main.ScreenPointToRay(Input.mousePosition);

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
}