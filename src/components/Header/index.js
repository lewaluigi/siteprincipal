import React from 'react';
import './style.css';
import './styles.css';


export default ({black})=>{ /* Logo do netflix e da conta do utilizador */
    return(
        <header className={black ?"black" : ''}>
            <div className="header--logo">
                <img src="https://logodix.com/logo/880238.png"/>
            </div>
            
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Procurar"
          />
        </div>

        <button type="submit" class="btn" id="search">
          Adicionar
        </button>
      
        </header>
    )
}