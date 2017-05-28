/**
 * @see https://stackoverflow.com/questions/24957656/ball-roll-animation-using-jquery-or-css3
 */
$( document ).ready( function() {
	

	pullTipps();
	//pullTippResults();
	
	function pullTippResults(userTipps){
		tippResults=buildTippResultDiv(6);
		//buildUserTippResultDiv(3);
		var $ball =$('#tippResult> div'),
	    diameter = $ball.height(),
	    perimeter = Math.PI * diameter,
			n = $ball.length,
	    i = 0, itv;
		console.dir($ball);
	
		itv = setInterval(function(){
			if(i>n)clearInterval(itv);
			rotateBallOfTipp(n*100-(diameter*i) );
			i++;
		},2000);
		function rotateBallOfTipp(distance) {
			console.log( distance );
		  var degree = distance * 360 / perimeter;
			$ball.eq(i).css({
				transition: "2s cubic-bezier(1.000, 1.450, 0.185, 0.850)",
				transform: 'translateX('+ distance +'px) translateY('+ 120 +'px)'
			}).find('div').css({
				transition: "2s cubic-bezier(1.000, 1.450, 0.185, 0.850)",
				transform: 'rotate(' + degree + 'deg)'	
			});
		}
		return tippResults;
		
		function buildTippResultDiv(howManyBalls){
			var ballColor = ['blue','red','green','yellow'];
			var channel=$("<div id='tippResult'>");
			var tippResults=shuffleBalls(1, 45, [], howManyBalls);
			
			for(var i=0;i<howManyBalls;i++){
				var ball=$("<div class='ball "+ballColor[getRandomInt(0, 3)]+"'> <!-- THIS ONE JUST MOVES RIGHT --> <div><span>"+tippResults[i]+"</span></div> <!-- THIS ONE ROTATES -->");
				channel.html(channel.get(0).innerHTML+ball.get(0).outerHTML);
			}
			
			$("body").prepend(channel);
			return tippResults;
				

		}
	}
	function pullTipps(){
		tippResults=buildTippDiv(6);
		//buildUserTippResultDiv(3);
		var $ball =$('#tipp> div'),
	    diameter = $ball.height(),
	    perimeter = Math.PI * diameter,
			n = $ball.length,
	    i = 0, itv;
		console.dir($ball);
	
		itv = setInterval(function(){
			if(i>n)clearInterval(itv);
			rotateBallOfTipp(n*100-(diameter*i) );
			i++;
		},200);
		function rotateBallOfTipp(distance) {
			console.log( distance );
		  var degree = distance * 360 / perimeter;
			$ball.eq(i).css({
				transition: "2s cubic-bezier(1.000, 1.450, 0.185, 0.850)",
				transform: 'translateX('+ distance +'px)'
			}).find('div').css({
				transition: "2s cubic-bezier(1.000, 1.450, 0.185, 0.850)",
				transform: 'rotate(' + degree + 'deg)'	
			});
		}
		return tippResults;
		
		function buildTippDiv(howManyBalls){
			var ballColor = ['blue','red','green','yellow'];
			var channel=$("<div id='tipp'>");
			var userTipps=shuffleBalls(1, 45, [], howManyBalls);
			
			for(var i=0;i<howManyBalls;i++){
				var ball=$("<div class='ball grey'> <!-- THIS ONE JUST MOVES RIGHT --> <div><span>"+userTipps[i]+"</span></div> <!-- THIS ONE ROTATES -->");
				channel.html(channel.get(0).innerHTML+ball.get(0).outerHTML);
			}
			
			$("body").prepend(channel);
			var pullTippResultsButton=$("<input type='button' value='Simuliere Ziehung'>");

			pullTippResultsButton.click( function() {
				pullTippResultsButton.toggle();
				var tippResults=pullTippResults(userTipps);
				itv = setTimeout(function(){
					//alert('Anzahl der Richtigen: '+getMatches(tippResults, userTipps));
					result=$("<p>");
					result.get(0).innerHTML='Anzahl der Richtigen: '+getMatches(tippResults, userTipps);
					result.get(0).style.color='red';
					$("body").prepend(result);
					var reloadButton=$("<input type='button' value='Neuer Tipp'>");
					reloadButton.click(function(){
						location.reload();
					});
					$("body").prepend(reloadButton);
				},14000);
				

				
			});

			$("body").prepend(pullTippResultsButton);
			return userTipps;
				

		}
		function getMatches(a,b) {

		    if (a instanceof Array && b instanceof Array) {
		        if (a.length!=b.length){// assert same length
		        	
		            return 0;
		        }  
			    a=a.sort();
			    b=b.sort();
			    var match=0;
		        for(var i=0; i<a.length; i++){ // assert each element equal
		            if(inArray(a[i], b)){
		            	match++;
		            }

		            	
		        }
		        return match;
		    } else {
		        return 0;
		    }
		}
	}



	


	
	


	
	function shuffleBalls(from, to, drawnBalls, howManyBalls){

		drawnBall=getRandomInt(from, to);  // returns a number between from and to
		while(drawnBalls.length<howManyBalls){
			if(drawnBalls.includes(drawnBall)){//this is ECMAScript 2016
			//if( inArray(drawnBall, drawnBalls)){				
				return shuffleBalls(from, to, drawnBalls, howManyBalls);
			}
			else{
				drawnBalls.push(drawnBall);
				return shuffleBalls(from, to, drawnBalls, howManyBalls);
			}
		}
		return drawnBalls;
	}
	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 * There are some examples on the Mozilla Developer Network page: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	 */
	function getRandomInt(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function inArray(needle,haystack)
	{
	    var count=haystack.length;
	    for(var i=0;i<count;i++)
	    {
	        if(haystack[i]===needle){return true;}
	    }
	    return false;
	}

});
