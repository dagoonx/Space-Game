#pragma strict

var cj : CharacterJoint = null;
var objInHand : Transform = null;

function Start() {
}

function setMouseLook(state : boolean) {
	GetComponent(MouseLook).enabled = state;
	Camera.main.GetComponent(MouseLook).enabled = state;
}

function Update() {
	var cam : Transform = Camera.main.transform;
	var mouseLook = GetComponent(MouseLook);
	if (Input.GetKey(KeyCode.E)) {
		setMouseLook(false);
		if (objInHand) {
			objInHand.rigidbody.angularVelocity = Vector3.zero;
			var sensitivityX : float = 15.0f;
 			var sensitivityY : float = 15.0f;
 			var sensitivityOffset : float = 5.0f;
			var rotationX = Input.GetAxis("Mouse X") * sensitivityX;
   			var rotationY = Input.GetAxis("Mouse Y") * sensitivityY;
   			var offset = Input.GetAxis("Mouse ScrollWheel") * sensitivityOffset;
   			objInHand.RotateAroundLocal( cam.up, -Mathf.Deg2Rad * rotationX );
   			objInHand.RotateAroundLocal( cam.right, Mathf.Deg2Rad * rotationY );
   			cj.transform.position += cam.forward * offset;
		}
	} else {
		setMouseLook(true);
	}
	if (Input.GetMouseButtonDown(0)) {
		if (cj && cj.connectedBody) {
			cj.connectedBody = null;
		} else {
			var hit : RaycastHit;
			if (Physics.Raycast(cam.position, cam.forward, hit, 10)) {
		    	if (hit.rigidbody) {
		    		if (!cj)
					{
						var go = new GameObject("Rigidbody dragger");
						go.transform.parent = cam;
						var body : Rigidbody = go.AddComponent ("Rigidbody") as Rigidbody;
						cj = go.AddComponent ("CharacterJoint");
						body.isKinematic = true;
					}
					cj.transform.position = hit.point;
//	    	   	  	sj.anchor = Vector3.zero;
//			    	sj.damper = 15.0;
//			    	sj.maxDistance = 0.2;
			    	cj.connectedBody = hit.rigidbody;
//			    	sj.spring = 50.0;
			    	objInHand = hit.transform;
		    	}
			}
		}
	}
}