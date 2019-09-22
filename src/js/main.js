(function(){

    //zamykanie koszyka -funkcja pomocnicza
    function closeBasket(){
    
      setTimeout( function(){
    
 
        $('.overlay').fadeOut();
        $('.shopping-basket').removeClass('active');
      },200);
    } 
    
    //otwieranie koszyka
    $('.header-basket').on('click', function(){
    
        $('.overlay').fadeIn();
        $('.shopping-basket').addClass('active');
      
      })
      
    //zamykanie koszyka
    $('.close-basket').on('click', function(){
        closeBasket();
      });
    
    //zamykanie koszyka po kliknieciu w aple (overlay)
    $('.overlay').on('click', function(){
        closeBasket();
    });
    
    //koszyk - zachowanie buttonu gdy nie ma produktow w koszyku
    function emptyBasket(){
    
      $('.customer-shopping').removeClass('active');
      $('.products-quantity .quantity').text('0'); 
      $(btnPay).addClass('btn-empty');
      $('.icon-basket-1').removeClass('active');

    
      $('.btn-empty').on('click', function(){
        $(this).addClass('btn-alert');
        $(this).removeClass('btn-empty');
      });
    
      $('.shopping-summary .summary-item').not('.summary').find('.value-price').text('-');
    }
    
    //stan koszyka - liczba produktow
    const basket = $('.shopping-basket-items');
    let itemsQuant = $(basket).children().length;
    const btnPay = $('.btn-basket');
    
    if (itemsQuant == 0) {  
      emptyBasket();
    }
    
    //Usuwanie rzeczy z koszyka
    const deleteItem = $('.btn-delete');
    
    deleteItem.on('click', function(){
    
      let basket = $('.summary .price').text();
      basket = parseFloat(basket,10);
      let itemPrice = $(this).closest('.basket').find('.item-price .item-value').text();
      itemPrice = parseFloat(itemPrice,10);
      let currentBasketValue = Number(Math.round((basket-itemPrice)+'e'+2)+'e-'+2);
        
      $('.shopping-basket-footer .summary .price').text(currentBasketValue);
      $('.shopping-basket-footer .value .price').text(currentBasketValue);
      $('.products-quantity .quantity').text($('.basket').length-1); 
      
      $(this).closest('.basket').delay(100).addClass('opacity').animate({
        marginLeft: 999,
        height: 0,
        padding: 0,
        margin: 0
      }, 500, function() {
    
          $(this).closest('.basket').css('display', 'none');
          $(this).closest('.basket').remove(); 
          $('.circle').text($('.basket').length); 
          
          transportCosts();
    
          if (itemsQuant == 0) {
            emptyBasket();
          }
    
        });
    
      itemsQuant= itemsQuant - 1;
    
    });
    
    //podliczenie rzeczy w koszyku
    function currentBasketValue(){
    
      let basketValue= 0;
      
      $('.shopping-basket-items .item-properties .item-price .item-value').each(function(){
    
        let element = $(this).text();
        element = parseFloat(element,10);
        basketValue = basketValue + element;
        basketValue = Number(Math.round(basketValue+'e'+2)+'e-'+2);
        
      });
    
      $('.shopping-basket-footer .value .price').text(basketValue);
      $('.shopping-basket-footer .summary .price').text(basketValue);
    
      if(basketValue>0) {
        $('.customer-shopping').addClass('active').find('.circle').text( $('.basket').length);
        $('.products-quantity .quantity').text( $('.basket').length);
      }
    }
    
    currentBasketValue();
    
    //koszt transportu
    function transportCosts(){
    
      let productsValue = $('.summary .price').text();
      productsValue = parseFloat(productsValue,10);
      const free= "Darmowa dostawa!";
      const costs = '150';
      
      if(productsValue >= 150) {
    
        $('.transport').addClass('free');
        $('.transport .price').text(free);
        
        }
    
      else if (productsValue < 150 && productsValue > 0){
        $('.transport').removeClass('free');
        $('.transport .price').text(costs);
      } 
    
      else {
        $('.transport').removeClass('free');
        $('.transport .price').text('0');
      }
    
    }
      
    transportCosts();
    
    })();