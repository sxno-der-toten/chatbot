export default (boturl, botname) => (
  `
   <div class="col-12" id="user_navbar">
     <div class="user row align-items-center">
       <div class="col-md-1">
         <img src="${boturl}" alt="" class="rounded-circle" style="width: 70px; height: 70px;">
       </div>
       <div class="col-md-8">
         <h5>${botname}</h5>
       </div>
     </div>
   </div>
 `
);
