#pragma strict

var handsFull : boolean  = false;//checks to see if hands have an object asighed to them
var objToHold : GameObject; // the object you are goign to be picking up
var hands : GameObject; // the empty that is your hands 
var hit : RaycastHit; // raycast hit veriable
var canProj : boolean = true;//checks to see if you can spawn a "ghost" of what you are holding
var canPlace : boolean = false;
var canSpawn : boolean = false;
var emptyPar : GameObject;
var clone : GameObject; //the "ghost" image before you place

function Start() {
	hands = this.transform.FindChild("Hands").gameObject;
}

function Update () {
	
	//if you press "E"
	shootRay();
	if (Input.GetMouseButtonDown(0)){
		if (handsFull == true){
			if(canPlace == false){
				dropObject();
				return;
			}
		}
		if (hit.transform.tag == "physTest") {
				pickUpObject();	
		}
		else {
			Debug.Log("you hit nothing");
		}						
	}
	else if (hit != null && hit.collider.tag == "snapPoints") {
		canPlace = true;
		if (Input.GetMouseButtonDown(1)) {
			
			
			//GameObject.Destroy(clone);
			placeObject();
			//new Frame(Frame(objToHold), Frame(hit.transform.gameObject), hit.collider);
			//dropObject();
		} else {
			GameObject.Destroy(clone);
			projectObject();
		}
	} 
	else{
		GameObject.Destroy(clone);
	}
}
// 
function setLayer(obj : GameObject, layer : int) {
	obj.layer = layer;	
	for (var child : Transform in obj.transform.FindChild("snapPoints").transform){
		child.gameObject.layer = layer;
	}
}

//function to pick things up
function pickUpObject(){
	objToHold = hit.transform.gameObject;				
	objToHold.transform.parent = hands.transform;
	objToHold.transform.rotation = hands.transform.rotation;
	objToHold.transform.position = hands.transform.position;
	objToHold.collider.enabled = false;
	handsFull = true;	
	objToHold.rigidbody.constraints = RigidbodyConstraints.FreezeAll;
	setLayer(objToHold, 2);
}
//function to drop things
function dropObject(){
	objToHold.transform.parent = null;
	objToHold.rigidbody.constraints = RigidbodyConstraints.None;
	objToHold.collider.enabled = true;
	canProj = true;
	handsFull = false;
	setLayer(objToHold, 0);
	objToHold = null;
}


function placeObject(){
	
	if (canPlace == true)
	{
	
		if (emptyPar == null)//creates parent if there is none
		{
			
			clone.transform.parent = null;		
			GameObject.Destroy(clone);
			
			objToHold.transform.parent = null;
			objToHold.transform.position = clone.transform.position;
			objToHold.transform.rotation = clone.transform.rotation;
			objToHold.layer = 0;
			objToHold.collider.enabled = true;
						
			canPlace = false;
			canSpawn = true;
			handsFull = false;
			canProj = true;	
			
			Destroy(objToHold.rigidbody);
			Destroy(hit.rigidbody);
			
			
			for (var i : int = 0; i < objToHold.transform.FindChild("snapPoints").childCount; i ++)
			{
				objToHold.transform.FindChild("snapPoints").GetChild(i).gameObject.layer = 0;					
			}			
				
			setLayer(objToHold, 0);
			emptyPar = GameObject("Frame");
			emptyPar.gameObject.AddComponent(Rigidbody);
			
			hit.transform.parent = emptyPar.transform;			
			objToHold.transform.parent = emptyPar.transform;
			objToHold = null;
		}
		else 
		{
			clone.transform.parent = null;		
			GameObject.Destroy(clone);
			objToHold.transform.parent = null;
			objToHold.transform.position = clone.transform.position;
			objToHold.transform.rotation = clone.transform.rotation;
			//objToHold.rigidbody.constraints = RigidbodyConstraints.None;				
			canPlace = false;
			canSpawn = true;
			handsFull = false;
			objToHold.layer = 0;
			Destroy(objToHold.rigidbody);
			
			for (var p : int = 0; p < objToHold.transform.FindChild("snapPoints").childCount; p ++){
				objToHold.transform.FindChild("snapPoints").GetChild(p).gameObject.layer = 0;
			
					
			}
			objToHold.collider.enabled = true;
			canProj = true;		
			setLayer(objToHold, 0);
			objToHold.transform.parent = emptyPar.transform;
			objToHold = null;
		}
		
	}
}

//general Raycast boolean
function shootRay() : boolean {
	var cam : Transform = Camera.main.transform;
	return Physics.Raycast(cam.position, cam.forward, hit, 10);
	
}


// projects the ghost object on the snap point hit by the raycast
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
		
}
			

