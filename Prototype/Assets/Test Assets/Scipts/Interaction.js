#pragma strict

var objToHold : GameObject = null; // the object you are goign to be picking up
var hands : GameObject; // the empty that is your hands 
var hit : RaycastHit; // raycast hit veriable
var clone : GameObject; //the "ghost" image before you place

function Start() {
	hands = this.transform.FindChild("Hands").gameObject;
}

function Update () {
	var didHit : boolean = shootRay();
	if (Input.GetMouseButtonDown(0)) {
		if (objToHold != null) {
			dropObject();
		} else if (didHit && hit.transform.tag == "physTest") {
			pickUpObject();	
		}
	} else if (didHit && hit.collider.tag == "snapPoints" && objToHold != null) {
		if (Input.GetMouseButtonDown(1)) {
			placeObject();
		} else if (clone == null) {
			projectObject();
		}
	} else if (clone != null) {
	        GameObject.Destroy(clone);
                clone = null;
	}
}

// really basic helper method to change the layer of an object and all its children
function setLayer(obj : GameObject, layer : int) {
	obj.layer = layer;	
	for (var child : Transform in obj.transform.FindChild("snapPoints").transform){
		child.gameObject.layer = layer;
	}
}

// function to pick things up
function pickUpObject(){
	objToHold = hit.transform.gameObject;				
	objToHold.transform.parent = hands.transform;
	objToHold.transform.rotation = hands.transform.rotation;
	objToHold.transform.position = hands.transform.position;
	objToHold.collider.enabled = false;
	objToHold.rigidbody.constraints = RigidbodyConstraints.FreezeAll;
	setLayer(objToHold, 2);
}

// function to drop things
function dropObject(){
	objToHold.transform.parent = null;
	objToHold.rigidbody.constraints = RigidbodyConstraints.None;
	objToHold.collider.enabled = true;
	setLayer(objToHold, 0);
	objToHold = null;
}

function placeObject(){
        if (hit.collider.transform.parent == null) {
            var par : GameObject = GameObject("Frame");
            par.AddComponent(Rigidbody);
            hit.collider.transform.parent = par.transform;
        }
        
        // set the transform parent
        objToHold.transform.parent = hit.collider.transform.parent;

        // move the object into place
        objToHold.transform.position = clone.transform.position;
        objToHold.transform.rotation = clone.transform.rotation;
	
        // make sure the physics work
        objToHold.collider.enabled = true;
        Destroy(objToHold.rigidbody);
        setLayer(objToHold, 0);

        // remove the phantom object
        GameObject.Destroy(clone);
        clone = null;

        // clean up references
        objToHold = null;
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
			

