$(function(){
	initCheckBox();
	nextQuestion();

	$("#T1 .ans").click(function(){
		if($(this).attr("is_ans") == "t"){
			$("#qNum").text(parseInt($("#qNum").text())+1)
			$("#result").text(" Correct!").removeClass().addClass("correct");
			nextQuestion();
		}else{
			$("#result").text(" Wrong!").removeClass().addClass("wrong");
		}
	});

	$("#T2 #btn_confirm").click(function(){
		var isAllCorrect = true;

		if($('#T2 [is_ans="t"]').length != $('.div-checkbox-checked').length){
			isAllCorrect = false;
		}else{
			_.forEach($('.div-checkbox-checked'), function(e,i){
				if($(e).attr('is_ans') == "f"){
					isAllCorrect = false;
					return false;
				}
			});
		}



		if(isAllCorrect){
			$("#qNum").text(parseInt($("#qNum").text())+1)
			$("#result").text(" Correct!").removeClass().addClass("correct");
			$('.div-checkbox-checked').removeClass('div-checkbox-checked');
			nextQuestion();
		}else{
			$("#result").text(" Wrong!").removeClass().addClass("wrong");
		}
	});

})

function indexOfKeyObj(list, targetObj){
	return list.map(function(e) { return e.key; }).indexOf(targetObj.key);
}

function printSharpQuestion(sharpObjList){
	var inAnsPutted = false;
	var loopList = sharpObjList.slice(0);
	var currentAns = loopList[Math.floor(Math.random()*sharpObjList.length)];
	loopList.splice(indexOfKeyObj(loopList, currentAns), 1);

	if(!_.isEmpty(currentAns.keyType)){
		key = currentAns.key + "#";
	}else{
		key = currentAns.key;
	}

	//Prepare Question
	$("#T1 #question").text(key + "大調有多少個 Sharp note")

	//Prepare Ans
	_.forEach($("#T1 .ans"), function(e,i){
		if(!inAnsPutted & ((i == ($("#T1 .ans").length - 1)) || Math.floor(Math.random()*2) == "1")){
			$(e).text(currentAns.numOfSharp);
			$(e).attr("is_ans","t");
			inAnsPutted = true;
		}else{
			var currAns = loopList[Math.floor(Math.random()*loopList.length)];
			$(e).text(currAns.numOfSharp);
			$(e).attr("is_ans","f");
			loopList.splice(indexOfKeyObj(loopList, currAns), 1);
		}
	});
}

function printFlatQuestion(flatObjList){
	var inAnsPutted = false;
	var loopList = flatObjList.slice(0);
	var currentAns = loopList[Math.floor(Math.random()*flatObjList.length)];
	loopList.splice(indexOfKeyObj(loopList, currentAns), 1);

	//Prepare Question
	if(!_.isEmpty(currentAns.keyType)){
		key = currentAns.key + "b";
	}else{
		key = currentAns.key;
	}

	$("#T1 #question").text(key + " 大調有多少個 Flat note");

	//Prepare Ans
	_.forEach($("#T1 .ans"), function(e,i){
		if(!inAnsPutted & ((i == ($("#T1 .ans").length - 1)) || Math.floor(Math.random()*2) == "1")){
			$(e).text(currentAns.numOfFlat);
			$(e).attr("is_ans","t");
			inAnsPutted = true;
		}else{
			var currAns = loopList[Math.floor(Math.random()*loopList.length)];
			$(e).text(currAns.numOfFlat);
			$(e).attr("is_ans","f");
			loopList.splice(indexOfKeyObj(loopList, currAns), 1);
		}
	});
}

function printSFQuestion(sharpObjList, flatObjList){
	var loopList;
	var questionType;
	var disQuestionType;
	var fullAnsList;
	var key;

	if(Math.floor(Math.random()*2) == "0"){
		loopList = sharpObjList.slice(0);
		questionType = "s";
	}else{
		loopList = flatObjList.slice(0);
		questionType = "f";
	}

	if(questionType === "s"){
		disQuestionType = "#";
		fullAnsList = sharpObjList[7];
	}else{
		disQuestionType = "b";
		fullAnsList = flatObjList[7];
	}
	var currentAns = loopList[Math.floor(Math.random()*loopList.length)];
	loopList.splice(indexOfKeyObj(loopList, currentAns), 1);
	fullNodeList = _.shuffle(fullAnsList.noteList);

	if(!_.isEmpty(currentAns.keyType)){
		key = currentAns.key + disQuestionType;
	}else{
		key = currentAns.key;
	}

	$("#T2 #question").text("以下那些是 " + key + " 大調的 " + disQuestionType + " note");

	_.forEach($("#T2 .ans"), function(e,i){
			if(i != $("#T2 .ans").length - 1){
				var opt = fullNodeList[i];
				$(e).text(opt + disQuestionType);

				if(currentAns.noteList.includes(opt)){
					$(e).attr("is_ans","t");
				}else{
					$(e).attr("is_ans","f");
				}
			}else{
				$("#allFalse").text("以上皆不是");
				if(currentAns.key == "C" && _.isEmpty(currentAns.keyType)){
					$("#allFalse").attr("is_ans","t");
				}else{
					$("#allFalse").attr("is_ans","f");
				}
			}
	});
}

function nextQuestion(){
	var c = {
		key: "C",
		keyType: "",
		numOfFlat: 0,
		numOfSharp: 0,
		noteList: []
	}
	var g = {
		key: "G",
		keyType: "",
		numOfSharp: 1,
		noteList: ["F"]
	}
	var d = {
		key: "D",
		keyType: "",
		numOfSharp: 2,
		noteList: ["F", "C"]
	}
	var a = {
		key: "A",
		keyType: "",
		numOfSharp: 3,
		noteList: ["F", "C", "G"]
	}
	var e = {
		key: "E",
		keyType: "",
		numOfSharp: 4,
		noteList: ["F", "C", "G", "D"]
	}
	var b = {
		key: "B",
		keyType: "",
		numOfSharp: 5,
		noteList: ["F", "C", "G", "D", "A"]
	}
	var fSharp = {
		key: "F",
		keyType: "sharp",
		numOfSharp: 6,
		noteList: ["F", "C", "G", "D", "A", "E"]
	}
	var cSharp = {
		key: "C",
		keyType: "sharp",
		numOfSharp: 7,
		noteList: ["F", "C", "G", "D", "A", "E", "B"]
	}
	var f ={
		key: "F",
		keyType: "",
		numOfFlat: 1,
		noteList: ["B"]
	}
	var bFlat ={
		key: "B",
		keyType: "flat",
		numOfFlat: 2,
		noteList: ["B", "E"]
	}
	var eFlat ={
		key: "E",
		keyType: "flat",
		numOfFlat: 3,
		noteList: ["B", "E", "A"]
	}
	var aFlat ={
		key: "A",
		keyType: "flat",
		numOfFlat: 4,
		noteList: ["B", "E", "A", "D"]
	}
	var dFlat ={
		key: "D",
		keyType: "flat",
		numOfFlat: 5,
		noteList: ["B", "E", "A", "D", "G"]
	}
	var gFlat ={
		key: "G",
		keyType: "flat",
		numOfFlat: 6,
		noteList: ["B", "E", "A", "D", "G", "C"]
	}
	var cFlat ={
		key: "C",
		keyType: "flat",
		numOfFlat: 7,
		noteList: ["B", "E", "A", "D", "G", "C", "F"]
	}

	var sharpObjList = [c, g, d, a, e, b, fSharp, cSharp];
	var flatObjList = [c, f, bFlat, eFlat, aFlat, dFlat, gFlat, cFlat];
	var allList = [c, g, d, a, e, b, fSharp, cSharp, f, bFlat, eFlat, aFlat, dFlat, gFlat, cFlat];
	var currQuestionType;

	var isQuestionValid = false;
	var index = 0;
	while(!isQuestionValid){
		currQuestionType = Math.floor(Math.random()*3);
		if(!$($(".questionType")[currQuestionType]).is(":checked")){
			isQuestionValid = true;
		}
		index++;
		if(index == 100){
			isQuestionValid = true;
		}
	}
	switch(currQuestionType){
		case 0: printSharpQuestion(sharpObjList);
						$("#T1").show();
						$("#T2").hide();
						break;
		case 1: printFlatQuestion(flatObjList);
						$("#T1").show();
						$("#T2").hide();
						break;
		default :printSFQuestion(sharpObjList, flatObjList);
						$("#T1").hide();
						$("#T2").show();
						break;
	}
}

function initCheckBox(){
	// image gallery
	// init the state from the input
	$("#T2 .ans").each(function () {
	  if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
	    $(this).addClass('div-checkbox-checked');
	  }
	  else {
	    $(this).removeClass('div-checkbox-checked');
	  }
	});

	// sync the state to the input
	$(".div-checkbox").on("click", function (e) {
	  $(this).toggleClass('div-checkbox-checked');
	  var $checkbox = $(this).find('input[type="checkbox"]');
	  $checkbox.prop("checked",!$checkbox.prop("checked"))

	  e.preventDefault();
	});
}

