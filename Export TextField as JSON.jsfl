//////////////////////////////
// Export TextField as JSON //
// by @andyr0id             //
//////////////////////////////

//account for the gutter:
//@see http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/text/TextLineMetrics.html
var TEXT_GUTTER = 2;

function debug(object)
{
	fl.trace(object);
	for (var i in object)
	{
		fl.trace(i);
		fl.trace(object[i]);
	}
	fl.trace("-----");
}

function exportTextField(textField, folder)
{
	var size = textField.getTextAttr("size"),
		out = "{\n";
	out += "\t"+'"x": '+(textField.x+TEXT_GUTTER)+",\n";
	out += "\t"+'"y": '+(textField.y+TEXT_GUTTER)+",\n";
	out += "\t"+'"width": '+(textField.width-TEXT_GUTTER)+",\n";
	out += "\t"+'"height": '+(textField.height-TEXT_GUTTER)+",\n";
	out += "\t"+'"color": "'+textField.getTextAttr("fillColor")+'",'+"\n";
	out += "\t"+'"align": "'+textField.getTextAttr("alignment")+'",'+"\n";
	out += "\t"+'"lineHeight": '+(size+textField.getTextAttr("lineSpacing"))+','+"\n";
	out += "\t"+'"font": {'+"\n";
	out += "\t\t"+'"family": "'+textField.getTextAttr("face")+'",'+"\n";
	out += "\t\t"+'"size": '+size+"\n";
	out += "\t"+"}\n";
	out += "}";

	var name = textField.name;
	if ( ! name)
		name = prompt('Please enter a file name for "'+textField.getTextString()+'"', "TextField");

	if ( ! name)
	{
		fl.trace('No name given, skipping "'+textField.getTextString()+'"');
		return;
	}

	var filePath = folder+"/"+name+".json";

	FLfile.write(filePath, out);
	fl.trace("Exported: "+filePath);
}

function init()
{
	var doc = fl.getDocumentDOM(),
		selection = doc.selection,
		numItems = selection.length;

	if ( ! numItems)
	{
		fl.trace("Select some objects first!");
		return;
	}

	var folder = fl.browseForFolderURL("Select a Folder");

	if ( ! folder)
	{
		fl.trace("No folder selected!");
		return;
	}

	for (var i = 0; i < numItems; i++)
	{
		if (selection[i] instanceof Text)
			exportTextField(selection[i], folder);
		else
		{
			fl.trace("Selected object is not a TextField:");
			fl.trace(selection[i]);
		}
	}
}

init();