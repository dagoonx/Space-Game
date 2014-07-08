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
	var cam : Transform = Camera.main.transform;
	return Physics.Raycast(cam.position, cam.forward, hit, 10);
}

function pickUp() {
	var snapPar = GameObject("emptySnapPar");

}

function use() {

}