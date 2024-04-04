export default (boturl, botname) => (
  `
   <div class="col-12" id="user_navbar">
     <div class="user row align-items-center">
       <div class="d-flex">
       <i class="fa-solid fa-angle-left"></i>
         <img src="${boturl}" alt="" class="rounded-circle" style="width: 70px; height: 70px;">
         <h5>${botname}</h5>
       </div>
     </div>
   </div>
 `
);
