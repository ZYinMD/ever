


 
export const getClickPosition = (e) => {
  
  var parentPosition = getPosition(e.currentTarget);
  var xPosition = e.clientX - parentPosition.x;
  var yPosition = e.clientY - parentPosition.y;

  var positions = {
    parentPosition : parentPosition,
    xPosition : xPosition,
    yPosition : yPosition,
    clientX : e.clientX,
    clientY : e.clientY
  }

  setClickPositions(positions);
}

var clickPositions;
export const setClickPositions = (positions) => {
  clickPositions = positions;
}

export const fetchClientPositions = () => {
  return clickPositions;
}
 
// Helper function to get an element's exact position
export const getPosition = (el) => {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
      
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
    
  }
  return {
    x: xPos,
    y: yPos 
  };
}

export const updatePosition = (e) => {
  // add your code to update the position when your browser
  // is resized or scrolled
  getClickPosition(e);
}

//Using for General Profile for now(Temporary Fix)
export const getProfilePosition = (container,dataLength) => {

  var parentContViewPort = container.getBoundingClientRect();
  var clickedScreensPos = fetchClientPositions();
  var dropDownTopPos;
  var dropDownLeftPos ;
  var dropDownHeightPos;
  var individualElement = dataLength * 32 + 20;

  if(individualElement > parentContViewPort.height) {
    dropDownHeightPos = parentContViewPort.height - (clickedScreensPos.clientY - parentContViewPort.top) - 25 ;
  }
  
  else {
    dropDownHeightPos = individualElement ;
  }

  return {
    dropDownTopPos: (clickedScreensPos.clientY - parentContViewPort.top) +  15,
    dropDownLeftPos : (clickedScreensPos.xPosition) - 100,
    dropDownHeightPos : dropDownHeightPos,
  }
}
