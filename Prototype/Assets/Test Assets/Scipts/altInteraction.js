#pragma strict
var hit : RaycastHit;

function Start () {
	
}

function Update () {

	
	if (Input.GetKeyDown(KeyCode.E)){
		shootRay();
		if (hit.transform.tag == "physTest") {
			pickUp();
		}
	}

}

function shootRay() : boolean {
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	return Physics.Raycast(ray, hit, 10);
}

function pickUp() {
	var snapPar = GameObject("emptySnapPar");

}

function use() {

}