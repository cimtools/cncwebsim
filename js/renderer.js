/**
 * @author Filipe Caixeta / http://filipecaixeta.com.br/
 */


CWS.Renderer = function (id,options) 
	{
		options = options || {};
		
		this.renderer = new THREE.WebGLRenderer({clearColor: 0xffffff,antialias: true });
		// this.renderer.domElement.style.background = "#ffffff";
		this.renderer.autoClear = true;
		this.renderer.setClearColor( 0xffffff );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		
		this.renderer.domElement.id=id;
		this.renderer.domElement.style['z-index']=41;

		this.scene = new THREE.Scene();

		var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
		this.scene.add( ambientLight );

		var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		this.scene.add( directionalLight );

		var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		this.scene.add( directionalLight );

		this.width = options.width || 512;
		this.height = options.height || 512;

		this.camera = new THREE.PerspectiveCamera(20, this.width / this.height, 0.1, 20000);
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 200;
		this.camera.lookAt( this.scene.position );
	}

CWS.Renderer.prototype.constructor = CWS.Renderer;

CWS.Renderer.prototype = 
	{
		get domElement()
	    {
	        return this.renderer.domElement;
	    },
	    set domElement(val)
	    {
	        this.renderer.domElement = val;
	    },
	};

CWS.Renderer.prototype.setCamera = function (camera)
	{
		if (camera=="Perspective")
			this.camera.toPerspective();
		else if (camera=="Orthographic")
			this.camera.toOrthographic();
	};

CWS.Renderer.prototype.setSize = function (width,height) 
	{
		this.width = width;
		this.height = height;
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( this.width, this.height );
	};

CWS.Renderer.prototype.addMesh = function (obj)
	{
		this.scene.add(obj);
	};

CWS.Renderer.prototype.removeMesh = function (meshName)
	{
		if (meshName!==undefined)
		{
			this.scene.remove(this.scene.getObjectByName(meshName));
		}
	};

CWS.Renderer.prototype.render = function (obj)
	{
		this.renderer.render( this.scene, this.camera );
	};

CWS.Renderer.prototype.updateMesh = function (obj)
	{
		this.removeMesh(obj.name);
        if (obj.geometry!==undefined)
		      this.scene.add(obj);  
	};