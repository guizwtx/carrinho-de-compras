'use client';
import React, { useState } from 'react';
import '../MarketCart/marketCar.css';

interface ILoja {
    id: number;
    titulo: string;
    preco: number;
    imagem: string;
}

interface IShoppingItem {
    produto: ILoja;
    quantidade: number;
}

const lojas = [
    {id:1, titulo:'Camisa 1 do Flamengo', preco:120.00, imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEUqfOHqCI81YaQzpf2M4IT64MgYO2I21DKToGz59KxLLnc66vee6aoZhy%2Ba2bb96XqPiOSPSZEBOykT1IUQCtkFp4iZbhqd5L5d8SwuAHay822mT3MnmdcbXnGFAPb9PVkPRKP1tASZHbiwC4OApYJFI9A0zjINSPSo%2FJwqbDqfnRUWj1RuhqezsgVDACB7MT27mvTsNzvJKj%2F%2BLGYSRCDa11RE2Nj%2FiY44ROJEdn9aITmb%2FNdTGGilXJnAdfRgHH2QIwgNoOaMrsy4zEj3zvlMh9kWZgcWR5A1iN7YHl5wcsSk1Y7e5qQaxMrwBFRjsHdubKF8iNDD3uPL7qfk9w9Pdu3iZ9qJvmgaTf%2F%2F19l1HN2hMdp2z2izXhdpKuwq4H3r7kohGBM1O%2FLl5kIdZI%2Fa8ZWtE0cv894WT9uXTx7aDIl%2Bwme7RUkluCtYPXvZIrVZe9unvzLPjflUBGhUKNrV6MxuJvIpb%2Biyx4VwGf8FqxK4ooA4v3aHpwHEiw8hI44F0SYj6ejqVE32wnaDrEx09MhW5kvpRsBLFSb9F%2FBOYwa2gm8UVRr9i5C1PnNKlUr8wwkXsk2h7BChtaSWwvKqQvkeb5dBG%2BwemlrP%2FkU%3D&sz=w512'},
    {id:2, titulo:'Camisa 2 do Flamengo', preco:125.00, imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEWaGEOZ1Lab3mdc3F56%2FEV4gDu7eoJcwKGxuCSWa7AOum6VDZh%2B19IUfAraHxn4Oon6VPUP%2BRa61jJwVyxKUaWWkabl%2BR%2BzaxBFPEL8CT8IiidY7wJT9BJv2tc0DhPWac7gNUwgTOJ9a4Em8iyJg89cd1v7XOD%2Fx%2Bz8UK%2BoQzEUanNt1SlDm7TQlIu2PTXRewo2Tbkzxr6pQBcq9%2BbGiKGoh1tFCR%2FvfIC%2FPP9F5BArpG%2FhNJ9%2BrUFHVp8QJhW%2FaZxhzXpPbctg2aQfid7xt%2F%2FGj1eZnFq7Sx7rXfqkJItav6%2BNxC%2FgpVI3C%2FLP1szKrPFjmqH4QvFzBBFWP5J6drDGdurTq8Op4WnPzKdIRwAIr8T3eB32h0YoySy12Ctkzx5DQOZ%2BsRJgRBvRPA2HAiO76G3CB2PvuKjgtFDceKiIbYHFcHbprgbRaPk9SKnYoHgydRg16w81zGZUEw4FRIRnJj0XhAuvRivUNsKsUbXWomccxjxjicmau54Yhn3fOfdkYY2%2Be8%2F5a4abHwa7aBKYE65Leyyb9yPUZWjZeqOwoQzhXsvnSg9w%2FxBHDCSupkZpSug1gp5gYlLwO9uv%2FP3xMc049Jhjcd7slTkj8OA%3D&sz=w1920-h945'},
    {id:3, titulo:'Camisa 1 do Vasco', preco:110.00, imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEV7cHBufb9Ipd74jsIEYj03umc14XrNhtrC8BKf3VYkqDRH5y52iFum57IycQw43pj%2B5mJ%2BoAaAauAIsPaXSd9xW7KrWs8wL7PnbdmaA5q8R82sniVHw%2BUwzH%2Fq6aSc0oSRCdbPeQ27hMC%2BueaNLfmrTEprMAZrRbpCtX%2BkLEwSGv%2FcJKXRg%2Bwfpcwvbch%2BaN%2FV8d7n6y1g9Z%2FR0SfszMCQQyqerVxcvNybBrPKrFgjejsP%2F8a%2By2d54qiVtLqQ8mMiKV7eSHyN5%2BAb1syzUXnxvEi3GEGCp81j3TWbAhswx04e6EmYpwioZTaEmY1%2Fr85megpkcYKj6b%2FsxgTxxaBlHflHFcHhNMjJOPRjqK4rQYtEafNK%2FZsVVEOfWpb71WVDcbVomWc0jTG%2Fxfsn%2FM6v%2FV%2FE5124J6drzJLs8yjKYohFvCXcLXrbU18muqhpk7XMIzMDjk60vE%2B5sCCaUlfbntoDv6GpdZrgbBet6WZb6tqlDt41z7BEGvlBqTTZ6TyWiukgsfBqfZbPXNNjevyzm599Z76gTlnJJQfJBxO63%2FweCHlxfuo7xBqN568YHNZuM2BJ793%2Fw3c27jhVIlN9TjLq3TgjHVctNkhs3eU%3D&sz=w1920-h945'},
    {id:4, titulo:'Camisa 2 do Vasco', preco:130.00, imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEWE52uJfJfhJyUljnZAR0cBSYwN7itEd2RXgRx83XS9mfDHkZu1ZM7cVrMOayewun5jmIFJANAnGbpz%2F5HXl1a021joEqshFthX5ks86TyR97l1ibeaSVJUBRDafcQgNCJ%2FJRZPtaC3NJys6JBFeSDRROBcJiDNNHI83n3rErESiQ1OFeWkpGK3ZS3DUNF9vGhX9GXYhNxBTJUpD%2B7Ba3qELyrqKh2skS2A2Vtnbbu7hUm3dmxoRqjrieUlSlSdPbZDfjNmscpLmaNQEeUaSE0rrGv0Oe20LIK0YDqg%2F4nVxGDIgZzBvFRVqE4tREPUHebRmpfRUUmadb3VyjI5eCLFZRQi92U9eChE%2Bj6p6HcBRP4T%2FUhQbfCoGCAQ7pGKVatcGzKwCNTQ3y%2FTp462HdjGBST%2FwICaGGFGjPAEORyLCoGMnbBW0BXaCyOhFqldihF5qZc86BY95Rs3DSMmSrWHFVf%2FIWBIdWzQYcHW%2FvIRESJkLvO9%2BEGqL%2BUZ9M%2FnM828q6YepZwwfwFnlElTA3EChcKQICbbaR6lHsy5zNGoTy25LkYSETAX08HarosuX%2BeiS%2FM9ymgcnF5F393KCRbK4Qzr8z92Gv%2B4CgEV7AU%3D&sz=w1920-h945'},
]

const formatarPreco = (preco: number): string => preco.toFixed(2);

const MarketCarPages = () => {
    const [ShoppingLoja, setShoppingLoja] = useState<IShoppingItem[]>([]);
    const [mostrarCarrinho, setMostrarCarrinho] = useState<boolean>(false);

    const handleAddLoja = (id: number) => {
        const loja = lojas.find((loja) => loja.id === id);
        if (!loja) return;

        setShoppingLoja(prevShoppingLoja => {
            const itemExistente = prevShoppingLoja.find(item => item.produto.id === id);
            
            if (itemExistente) {
                return prevShoppingLoja.map(item => 
                    item.produto.id === id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }

            return [...prevShoppingLoja, { produto: loja, quantidade: 1 }];
        });
    };

    const handleRemoveLoja = (id: number) => {
        setShoppingLoja(prevShoppingLoja => {
            const itemExistente = prevShoppingLoja.find(item => item.produto.id === id);
            
            if (itemExistente && itemExistente.quantidade > 1) {
                return prevShoppingLoja.map(item => 
                    item.produto.id === id
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                );
            }

            return prevShoppingLoja.filter(item => item.produto.id !== id);
        });
    };

    const totalLoja = ShoppingLoja.reduce((total, item) => {
        return total + (item.produto.preco * item.quantidade);
    }, 0);

    const totalItens = ShoppingLoja.reduce((total, item) => {
        return total + item.quantidade;
    }, 0);

    return (
        <div className='container'>
            <h3>@mgsportsoficial</h3>
            <div className='logo-container'>
                <img src="https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEVQ8b6plNjVuSLXQltk0WoKPJkzDEKrBQkjtTmUBwhAiKM%2F1HqvGJPRqX0eEjbIamUoH7VgXlLk9J%2BnZp43UownXFZE4pExTlYghnLU2niYespmQTdPdA52TyS2NDMkus6RLlLwZFE2%2BsXqxfuKUDt58sO4t4WMLZO0BsI42lCjNWbHLaQ7FQbEc6z10iAejlBb7jP11XGCSK8uhl4UDrwPMPXBccT7Tu0Tpazcaur%2BDIcXut%2BbPFz6uSpwOHvab%2F0OQKqiCTiJEI1S%2FAeXRtjABfR6sAoUeHOXriF3rj0A8hX3ZeoDzd67HgXbESdKaD2IbSB1mB8SKaRIFHZ0Sj8%2FctVYsNAwpvNM8P3YtINwRzN9LYgG9C3inV5lv%2FC07cKtX%2FtEZoNsX5xSgpQ%2BAZcink7uvXk%2FqbDeB5JXCcQbwFbMNksRBeowNMmSSPgULDd0xxR5oywjt3c%2BbvDQ1VXvC%2F2Q5CRhCZ6r9Xn4yafehiWx8ITvRRcwLewmUu1SyJH4CoXKOWgpeGd9lQBTb2YiqQVF9qBTxvS9zshHCxUg%2FSGHGAQaveBxvoN3oMYPiY8jHd%2FxJEiyIz9xCBMoTQgKfKbWOcL41t%2FhzFyh%2FKg%3D&sz=w1920-h945" alt="Logo da Loja" className='logo' />
            </div>
            <ul className='loja-list'>
                {lojas.map((loja) => (
                    <li key={loja.id} className='loja-item'>
                        <img src={loja.imagem} alt={loja.titulo} className='loja-imagem' />
                        <div className='loja-info'>
                            <p>{loja.titulo}</p>
                            <p>Preço: R$ {formatarPreco(loja.preco)}</p>
                            <button onClick={() => handleAddLoja(loja.id)}>Adicionar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => setMostrarCarrinho(!mostrarCarrinho)} className='toggle-cart-button'>
                {mostrarCarrinho ? `Ocultar Carrinho (${totalItens})` : `Mostrar Carrinho (${totalItens})`}
            </button>
            {mostrarCarrinho && (
                <>
                    <h1>Carrinho de Compras: R$ {formatarPreco(totalLoja)}</h1>
                    <ul className='shopping-list'>
                        {ShoppingLoja.map((item) => (
                            <li key={item.produto.id} className='shopping-item'>
                                <img src={item.produto.imagem} alt={item.produto.titulo} className='shopping-imagem' />
                                <div className='shopping-info'>
                                    <p>Título: {item.produto.titulo}</p>
                                    <p>Preço: R$ {formatarPreco(item.produto.preco)}</p>
                                    <p>Quantidade: {item.quantidade}</p>
                                    <p>Total: R$ {formatarPreco(item.produto.preco * item.quantidade)}</p>
                                    <button onClick={() => handleRemoveLoja(item.produto.id)}>Remover</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default MarketCarPages;
