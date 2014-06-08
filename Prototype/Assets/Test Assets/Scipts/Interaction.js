#pragma strict

var handsFull : boolean  = false;//checks to see if hands have an object asighed to them
var objToHold : GameObject; // the object you are goign to be picking up
var hands : GameObject; // the empty that is your hands 
var hit : RaycastHit; // raycast hit veriable
var canSpawn : boolean = true;//checks to see if you can spawn a "ghost" of what you are holding
var clone : GameObject; //the "ghost" image before you place
var canPlace : boolean = false;// tells you if you can place or not with click
var snapPar : GameObject; 
//var snapRot : Quaternion = clone.transform.Find("snapPoints").transform.Find("snapPoint0").transform.rotation;
function Start() {
	//hands = transform.FindChild("Hands").gameObject;
	hands = GameObject.Find("Hands");
}
function Update () {
	///auto update works again?!
	
	//if you press "E"	
	if (Input.GetKeyDown(KeyCode.E)){
		shootRay();		
		if (handsFull == true){
			dropObject();
		}			
		// summons the ray cast useing ray as origin, reachTouch as HIt and a length of 100
		else if(handsFull == false){									   
			//if the summoned ray hits a button
			if(hit.transform.tag == "Button"){		   
		   		Debug.Log("ya hit me!");						
				butt.amOn = true;
			}
			else if (hit.transform.tag == "physTest"){
				pickUpObject();	
			}
			else{
				Debug.Log("you hit nothing");
			}			
		}			
		//if the summoned ray hits anything else	
		else{
			Debug.Log("Nothing to pick up");
		}
		
	}
	else if (handsFull == true){	
		
	projectObject();	}		
			
}
//function to pick things up
function pickUpObject(){
	objToHold = hit.transform.gameObject;				
	objToHold.transform.parent = hands.transform;
	objToHold.transform.rotation = hands.transform.rotation;
	objToHold.transform.position = hands.transform.position;
	handsFull = true;	
	objToHold.rigidbody.constraints = RigidbodyConstraints.FreezeAll;
	objToHold.layer = 2;
	
	for (var i : int = 0; i < objToHold.transform.FindChild("snapPoints").childCount; i ++){
		objToHold.transform.FindChild("snapPoints").GetChild(i).gameObject.layer = 2;
	}
}
//function to drop things
function dropObject(){
	objToHold.transform.parent = null;
	objToHold.rigidbody.constraints = RigidbodyConstraints.None;
	GameObject.Destroy(clone);
	canSpawn = true;
	handsFull = false;
	objToHold.layer = 0;
		for (var i : int = 0; i < objToHold.transform.FindChild("snapPoints").childCount; i ++){
		objToHold.transform.FindChild("snapPoints").GetChild(i).gameObject.layer = 0;
	}
}
//general Raycast boolean
function shootRay() : boolean {
	return Physics.Raycast(transform.position, transform.forward, hit, 10);
}
//instantiace clone of what you are holding
function instCloneObj()
{
	if (canSpawn == true)
	{		 
		clone = Instantiate(objToHold.gameObject, hit.point + (hit.normal * .25f), (Quaternion.LookRotation(hit.normal)));
		canSpawn = false;
	}
	
}
//ability to place obvjects with click
function placeObject(){
	if (canPlace == true)
	{
		clone.transform.parent = null;
		
		GameObject.Destroy(clone);
		objToHold.transform.parent = null;
		objToHold.transform.position = snapPar.transform.position;
		objToHold.transform.rotation = hit.collider.transform.rotation;
		objToHold.rigidbody.constraints = RigidbodyConstraints.None;
		GameObject.Destroy(snapPar);		
		canPlace = false;
		canSpawn = true;
		handsFull = false;
		objToHold.layer = 0;
		for (var i : int = 0; i < objToHold.transform.FindChild("snapPoints").childCount; i ++){
		objToHold.transform.FindChild("snapPoints").GetChild(i).gameObject.layer = 0;
	}
		if (hit.transform.parent == null)//creates parent if there is none
		{
			var newPar = new GameObject("emptyPar");
			hit.transform.parent = newPar.transform;
			objToHold.transform.parent = hit.transform.parent;
					
		}
		else
		{
			objToHold.transform.parent = hit.transform.parent;
		}
		
	}
}
//projects teh ghost object at the end of the ray cast
function projectObject()
{
	if (shootRay())
	{
		instCloneObj();		
		clone.layer = 2;
		clone.renderer.material.shader = Shader.Find("Transparent/Diffuse");
		clone.renderer.material.color.a = 0.5f;
		clone.collider.enabled = false;
				
		if (hit.collider.tag == "snapPoints")
		{
			canPlace = true;
			if (Input.GetMouseButtonDown(0))
			{
				placeObject();
			}
			if (snapPar == null)
			{
				snapPar = new GameObject("emptySnapPar");				
				snapPar.transform.position = clone.transform.Find("snapPoints").transform.Find("snapPoint0").transform.position + new Vector3(0, -.5f, 0);								
				clone.transform.parent = snapPar.transform;					
			
			}			
			if (snapPar !=null)
			{
				snapPar.transform.position = hit.collider.transform.position + new Vector3 (0,0,0);
				snapPar.transform.rotation = hit.collider.transform.rotation;
			}
			
			else
			{
				
				//snapPar.transform.position = hit.transform.position;
				//snapPar.transform.rotation = hit.transform.rotation;				 
					
			}			
					
							
		}
		else //if (hit.collider.tag != "emptySnapPar")
		{	
			
			clone.transform.position = hit.point + (hit.normal * .25f);
			clone.transform.rotation = Quaternion.LookRotation(hit.normal);			
				
		}	
		
	}			
	else 
	{
		
		GameObject.Destroy(snapPar);			
		GameObject.Destroy(clone);			
		canSpawn = true;
		canPlace = false;
		
	}		
}
			

