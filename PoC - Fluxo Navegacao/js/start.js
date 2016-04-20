  //Function de leitura do JSON, extração e plotagem no diagrama
  function lerJSON(myDiagram)
  {
	  	var data = document.getElementById("txtJSON");
		var dados = JSON.parse(data.value);
		var estados = [];
		var parents = [];
		var inicioJSON = "[";
		var fimJSON = "]";
	  
	  //Leitura do JSON
	  for(var f in dados)
	   {
			estados.push(dados[f].state);
			
			var dadosJSON1 = dados[f].config.replace(/'/g,"\"");
			var dadosJSON2 = dadosJSON1.replace("url","\"url\"");
			var dadosJSON3 = dadosJSON2.replace("templateUrl","\"templateUrl\"");
			var dadosJSON4 = dadosJSON3.replace("controller","\"controller\"");
			var dadosJSON5 = dadosJSON4.replace("parent","\"parent\"");
			var arquivoConfig = inicioJSON.concat(dadosJSON5,fimJSON);
			var configs = JSON.parse(arquivoConfig);
			
			parents.push(configs[0].parent);
	   }	  
	
		//Geração dos nós
		for(var i in estados)
		{
			myDiagram.model.addNodeData({key:estados[i],color:"lightblue"});
		}

		//Geração das dependências
		for(var n in parents)
		{
			if(parents[n] != undefined)
			{
				myDiagram.model.addLinkData({from:parents[n], to:estados[n]});
			}
		}
  }; 
  
//Function de criação do diagrama - GoJS
function createDiagram() 
{
    if (window.goViewSource) goViewSource(); 
    var $ = go.GraphObject.make;  
    myDiagram = $(go.Diagram, "myDiagramDiv", 
    {
        initialContentAlignment: go.Spot.Center, "undoManager.isEnabled": true
    });
    
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",  // the Shape will go around the TextBlock
        $(go.Shape, "RoundedRectangle",
          // Shape.fill is bound to Node.data.color
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 3 },  // some room around the text
          new go.Binding("text", "key"))
      );
	  
	  lerJSON(myDiagram);      
  };
  



