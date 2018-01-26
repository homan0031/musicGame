$(function(){
	var c = {
		key: "C",
		numOfSharp: 0,
		sharpList: []
	}

	var g = {
		key: "G",
		numOfSharp: 1,
		sharpList: ["F#"]
	}

	var d = {
		key: "D",
		numOfSharp: 2,
		sharpList: ["F#", "C#"]
	}

	var a = {
		key: "A",
		numOfSharp: 3,
		sharpList: ["F#", "C#", "G#"]
	}

	var e = {
		key: "E",
		numOfSharp: 4,
		sharpList: ["F#", "C#", "G#", "D#"]
	}

	var b = {
		key: "B",
		numOfSharp: 5,
		sharpList: ["F#", "C#", "G#", "D#", "A#"]
	}

	var fSharp = {
		key: "F#",
		numOfSharp: 6,
		sharpList: ["F#", "C#", "G#", "D#", "A#", "E#"]
	}

	var cSharp = {
		key: "C#",
		numOfSharp: 7,
		sharpList: ["F#", "C#", "G#", "D#", "A#", "E#", "B#"]
	}

	var sharpObjList = [c, g, d, a, e, b, fSharp, cSharp];

	var currentAns = sharpObjList[Math.floor(Math.random()*sharpObjList.length)];
	var loopList = sharpObjList;

	var ansList = [];
	ansList.push(currentAns);
	loopList.splice(indexOfKeyObj(loopList, currentAns), 1);

	for(var i=1; i<4; i++){
			var currAns = loopList[Math.floor(Math.random()*loopList.length)];
			ansList.push(currAns);
			loopList.splice(indexOfKeyObj(loopList, currAns), 1);
	}

	console.log(ansList);
})

function indexOfKeyObj(list, targetObj){
	return list.map(function(e) { return e.key; }).indexOf(targetObj.key);
}