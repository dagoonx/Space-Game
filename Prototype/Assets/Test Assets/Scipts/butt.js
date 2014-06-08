#pragma strict
static var amOn = false;
var thePrefab : GameObject;
var sP : GameObject;



function Start () {
	sP = GameObject.Find("swnPnt");
	
	

}

function Update () {
	
	
	
	if (amOn == true){
	
		renderer.material.color = Color.blue;
		
		Instantiate(thePrefab, sP.transform.position, sP.transform.rotation);
		
		butt.amOn = false;
	}

}