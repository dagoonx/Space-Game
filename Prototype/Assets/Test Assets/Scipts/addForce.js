#pragma strict
static var isOn : boolean = false;
var hit : RaycastHit;
var tp :Transform;

function Start () {

}

function Update () {
	while (isOn == true){
		var maxStr : float = 10;
		var curDis: float = hit.distance;		
		tp = transform.Find("thrustPoint").transform;
		Debug.DrawRay (tp.position, Vector3.down * 2, Color.red);
		Debug.Log("iwork!"); 
		
		//maxStr = (-1*maxStr);
		
	}
}
		 
        /*if (Physics.Raycast (tp.position, Vector3.down, hit, 2)) {
        
        
        		maxStr = (-1*maxStr)+b;
        	
        		Debug.Log("iwork!");        	
        	}
        	rigidbody.AddRelativeForce (Vector3.up * 8);        	
            
            Debug.Log("why!");
        }
    }
		
}*/
