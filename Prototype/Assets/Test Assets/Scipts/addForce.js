#pragma strict
var hit : RaycastHit;
var maxStr : float;
var curDis: float;

function Update () {
	var fuel = GetComponent(Fuel);
	for (var tp : Transform in transform) if (tp.name == "testaux") {
		Debug.DrawRay (tp.position, Vector3.down * 10, Color.red);
        if (Physics.Raycast (tp.position, Vector3.down, hit, 20)) {
        	curDis = hit.distance;
			if (curDis < 10) {
				maxStr = 10 - 1.5 * curDis; 
			} else {
				maxStr = 0;
			}
        	rigidbody.AddForceAtPosition(Vector3.up * maxStr * Time.deltaTime * 725, tp.position);
        }
    }
    if (Input.GetKey(KeyCode.W) && fuel.Consume()){			
		rigidbody.AddRelativeForce(Vector3.forward * 30 * Time.deltaTime * 725);
	}
	if (Input.GetKey(KeyCode.S) && fuel.Consume()){		
		rigidbody.AddRelativeForce(Vector3.back * 30 * Time.deltaTime * 725);
	}
    if (Input.GetKey(KeyCode.D) && fuel.Consume()){			
		rigidbody.AddRelativeTorque (Vector3.up * 5 * Time.deltaTime * 725);		
	}
	if (Input.GetKey(KeyCode.A) && fuel.Consume()){		
		rigidbody.AddRelativeTorque (Vector3.up * -5 * Time.deltaTime * 725);
		
	} 
}
