var siteName = document.getElementById("NameInput")
var siteUrl = document.getElementById("UrlInput")
var boxInfo  = document.querySelector(".box-info");
var closeBtn = document.getElementById("closeBtn");

var siteList = []
function addSite(){

    if(isValidationAll(siteName , 'msgName') && isValidationAll(siteUrl , 'msgUrl')){
        var site = {
        name : siteName.value,
        url : siteUrl.value
    }

    
    siteList.push(site)
    localStorage.setItem("site" , JSON.stringify(siteList))
    console.log(siteList)

    displayData()
    clearForm()
    }
    else{
        boxInfo.classList.remove("d-none");
    }
    closeBtn.addEventListener("click", function(){
  boxInfo.classList.add("d-none");
});
}


if(localStorage.getItem("site") !== null){
    siteList = JSON.parse(localStorage.getItem("site"))
    displayData()
}

function clearForm(){
    siteName.value = null
    siteUrl.value = null

    siteName.classList.remove('is-valid')
    siteUrl.classList.remove('is-valid')
}

function displayData(){
    var cartona = ""
    for(var i = 0 ; i < siteList.length ; i++){
         cartona += `
        <tr>
                <th class="">${i+1}</th>
                <th class="">${siteList[i].name}</th>
                <th class=""><button type="button" class="btn btn-warning fw-bold" id="visitBtn" onclick="visitSite(${i})"><i class="fa-solid fa-eye"></i> Visit</button></th>
                <th class=""><button type="button" class="btn btn-danger fw-bold" id="DeleteBtn" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></th>
            </tr>
        `
        
    }
    document.getElementById("TableContent").innerHTML = cartona
}

function deleteSite(index){
    siteList.splice(index , 1)
    localStorage.setItem("site" , JSON.stringify(siteList))
    displayData();
}

function visitSite(index){
    window.open(siteList[index].url , "_blank")
}

function isValidationAll(element , msgID) {
  var msg = document.getElementById(msgID)
  var regex ={
    NameInput : /^[A-Za-z0-9 _-]{3,}$/,
    UrlInput: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{3,})(\/[^\s]*)?$/
  }

  if(regex[element.id].test(element.value)){
    element.classList.add('is-valid')
    element.classList.remove('is-invalid')
    msg.classList.add('d-none')
    return true
  }else{
    element.classList.remove('is-valid')
    element.classList.add('is-invalid')
    msg.classList.remove('d-none')
    return false
  }
}