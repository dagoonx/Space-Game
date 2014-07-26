#pragma strict
static var isOn : boolean = false;
var hit : RaycastHit;
var maxStr : float;
var curDis: float;
function Start () {

}

function Update () {
	for (var tp : Transform in transform) if (tp.name == "testaux") {
		Debug.DrawRay (tp.position, Vector3.down * 10, Color.red);
        if (Physics.Raycast (tp.position, Vector3.down, hit, 20)) {
        	curDis = hit.distance;
			if (curDis < 10) {
				maxStr = 10 - 1.5 * curDis; 
			} else {
				maxStr = 0;
			}
        	rigidbody.AddForceAtPosition(Vector3.up * maxStr, tp.position);
        }
    }
    if (Input.GetKey(KeyCode.W)){			
		rigidbody.AddRelativeForce(Vector3.forward * 30);		
	}
	if (Input.GetKey(KeyCode.S)){		
		rigidbody.AddRelativeForce(Vector3.back * 30);
	}
    if (Input.GetKey(KeyCode.D)){			
		rigidbody.AddRelativeTorque (Vector3.up * 5);		
	}
	if (Input.GetKey(KeyCode.A)){		
		rigidbody.AddRelativeTorque (Vector3.up * -5);
		
	} 
}
