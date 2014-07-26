#pragma strict
var hit : RaycastHit;
var objToHold : GameObject; // the object you are goign to be picking up
var hands : GameObject; // the empty that is your hands 
var handsFull : boolean  = false;//checks to see if hands have an object asighed to them
var canProj : boolean = true;//checks to see if you can spawn a "ghost" of what you are holding
var clone : GameObject; //the "ghost" image before you place
function Start () {
	hands = this.transform.FindChild("Hands").gameObject;	
}

function Update () {
	shootRay();	
	if (Input.GetKey(KeyCode.E)){
		addForce.isOn = true;
	}
	else{
		addForce.isOn = false;
	}
	if (Input.GetKeyDown(KeyCode.H)){
		forceRocket.isOnR = true;
	}
	
	
	if (Input.GetMouseButtonDown(0)){
	
		if (handsFull == true){
			dropObject();
			return;
		}
		
		if (hit.transform.tag == "physTest") {
			pickUp();
		}
		
		
	}
	
	if (handsFull == true){
			if (hit.transform.collider.tag == "snapPoints"){
				projectObject();
				
			}		
		}
	

}

function shootRay() : boolean {
	var cam : Transform = Camera.main.transform;
	return Physics.Raycast(cam.position, cam.forward, hit, 10);
}

function pickUp() {
	handsFull = true;
	objToHold = hit.transform.gameObject;				
	objToHold.transform.parent = hands.transform;
	objToHold.transform.rotation = hands.transform.rotation;
	objToHold.transform.position = hands.transform.position;
	objToHold.collider.enabled = false;		
	objToHold.rigidbody.constraints = RigidbodyConstraints.FreezeAll;
	setLayer(objToHold, 2);

}

function dropObject(){
	objToHold.transform.parent = null;
	objToHold.rigidbody.constraints = RigidbodyConstraints.None;
	objToHold.collider.enabled = true;
	canProj = true;
	handsFull = false;
	setLayer(objToHold, 0);
	objToHold = null;
}

function setLayer(obj : GameObject, layer : int) {
	obj.layer = layer;	
	for (var child : Transform in obj.transform.FindChild("snapPoints").transform){
		child.gameObject.layer = layer;
	}
}

function projectObject()
{
	var newClone : GameObject;
	newClone = GameObject.Instantiate(objToHold);
	var snapPoints : Transform = newClone.transform.FindChild("snapPoints");
	var toSnap : GameObject = snapPoints.GetChild(0).gameObject;
	newClone.transform.rotation = Quaternion.LookRotation(hit.collider.transform.forward,
														  -hit.collider.transform.up);
	newClone.transform.position = hit.collider.transform.position - toSnap.transform.position
								  + 0.5f * toSnap.transform.up;
	// snap points are rotated 180 degrees around the blue axis
	newClone.layer = 2;
	newClone.renderer.material.shader = Shader.Find("Transparent/Diffuse");
	newClone.renderer.material.color.a = 0.5f;
	newClone.collider.enabled = false;
	clone = newClone;
	GameObject.Destroy(clone);
		
}
function use() {

}