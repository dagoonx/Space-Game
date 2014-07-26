#pragma strict
static var isOnR : boolean = false;
var hit : RaycastHit;
var tp :Transform;

function Start () {

}

function Update () {
	if (isOnR == true){
		tp = transform.Find("thrustPoint").transform;
		Debug.DrawRay (tp.position, Vector3.back * 2, Color.red);
		rigidbody.AddRelativeForce (Vector3.down * 10);    
        if (Physics.Raycast (tp.position, Vector3.back, hit, 2)) {
        	     	
            
            Debug.Log("boom!");
        }
    }
	
		//rigidbody.AddRelativeForce (Vector3.up * 10);
}
//barricade = transform.Find("Wall").Find("Barricade").gameObject;
//tp = transform.Find("thrustPoint").transform;