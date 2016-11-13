#pragma strict

var gameOver : GameObject;

function OnTriggerEnter (other : Collider) {
  gameOver.SetActive(true);
}