#pragma strict

var rate : float = 20;
var fuel : float = 100;

function Consume() : boolean {
	fuel -= rate * Time.deltaTime;
	if (fuel < 0) {
		fuel = 0;
		return false;
	}
	return true;
}

function OnGUI() {
	GUI.Label(Rect(10, 10, 30, 20), fuel.ToString());
}