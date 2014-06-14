#pragma strict

var handsFull : boolean  = false;//checks to see if hands have an object asighed to them
var objToHold : GameObject; // the object you are goign to be picking up
var hands : GameObject; // the empty that is your hands 
var hit : RaycastHit; // raycast hit veriable
var canProj : boolean = true;//checks to see if you can spawn a "ghost" of what you are holding
var clone : GameObject; //the "ghost" image before you place
var canPlace : boolean = false;// tells you if you can place or not with click
var snapPar : GameObject; 
//var snapRot : Quaternion = clone.transform.Find("snapPoints").transform.Find("snapPoint0").transform.rotation;
//function Start() {
//	//hands = transform.FindChild("Hands").gameObject;
//	hands = GameObject.Find("Hands");
//}
function Update () {
	//if you press "E"
	var rayhit : boolean = shootRay();
	if (Input.GetKeyDown(KeyCode.E)){
		if (handsFull == true){
			dropObject();
			return;
		}
		if (rayhit) {
			if (hit.transform.tag == "physTest") {
				pickUpObject();	
			}
		} else {
			Debug.Log("you hit nothing");
		}						
	}
	if (clone) {
		GameObject.Destroy(clone);
	}
	if (handsFull && rayhit && hit.collider.tag == "snapPoints") {
		projectObject();
	}
}

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
//general Raycast boolean
function shootRay() : boolean {
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	return Physics.Raycast(ray, hit, 10);
}
////instantiate clone of what you are holding
//function instCloneObj()
//{
//	if (canSpawn == true)
//	{		 
//		clone = Instantiate(objToHold.gameObject, hit.point + (hit.normal * .25f), (Quaternion.LookRotation(hit.normal)));
//		canSpawn = false;
//	}
//	
//}
//ability to place obvjects with click
//function placeObject(){
//	if (canPlace == true)
//	{
//		clone.transform.parent = null;
//		
//		GameObject.Destroy(clone);
//		objToHold.transform.parent = null;
//		objToHold.transform.position = snapPar.transform.position;
//		objToHold.transform.rotation = hit.collider.transform.rotation;
//		objToHold.rigidbody.constraints = RigidbodyConstraints.None;
//		GameObject.Destroy(snapPar);		
//		canPlace = false;
//		canSpawn = true;
//		handsFull = false;
//		objToHold.layer = 0;
//		for (var i : int = 0; i < objToHold.transform.FindChild("snapPoints").childCount; i ++){
//		objToHold.transform.FindChild("snapPoints").GetChild(i).gameObject.layer = 0;
//	}
//		if (hit.transform.parent == null)//creates parent if there is none
//		{
//			var newPar = new GameObject("emptyPar");
//			hit.transform.parent = newPar.transform;
//			objToHold.transform.parent = hit.transform.parent;
//					
//		}
//		else
//		{
//			objToHold.transform.parent = hit.transform.parent;
//		}
//		
//	}
//}
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
//	if (shootRay())
//	{
//		instCloneObj();		
//		
//				
//		if (hit.collider.tag == "snapPoints")
//		{
//			canPlace = true;
//			if (Input.GetMouseButtonDown(0))
//			{
//				placeObject();
//			}
//			if (snapPar == null)
//			{
//				snapPar = new GameObject("emptySnapPar");				
//				snapPar.transform.position = clone.transform.Find("snapPoints").transform.Find("snapPoint0").transform.position + new Vector3(0, 0, 0);
//				snapPar.transform.rotation = clone.transform.Find("snapPoints").transform.Find("snapPoint0").transform.localRotation;								
//				clone.transform.parent = snapPar.transform;					
//			
//			}			
//			else if (snapPar != null)
//			{	
//				//snapPar.transform.position = hit.collider.transform.position;
//				snapPar.transform.position = hit.collider.transform.position + new Vector3 (0,0,0);
//				snapPar.transform.rotation = hit.collider.transform.localRotation;
//			}
//	}			
//	else 
//	{
//		GameObject.Destroy(clone);			
//		canSpawn = true;
//		canPlace = false;
//		
//		clone.transform.parent = null;
//		GameObject.Destroy(snapPar);
//		snapPar = null;	
//		clone.transform.position = hit.point + (hit.normal * .25f);
//		clone.transform.rotation = Quaternion.LookRotation(hit.normal);	
//	}		
}
			

