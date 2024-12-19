// URL dell'API e token fornito
const API_URL = "https://api.clashroyale.com/v1/cards";
const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA4MzcyYTA4LTMzYzAtNGNiMy04YzQzLTE4ZmU4ZjQ2YjIzYiIsImlhdCI6MTczNDAyNTk2NSwic3ViIjoiZGV2ZWxvcGVyL2Y2Zjc0ZmMyLTJjMzktOTE4OS04YmZkLTU4ODc4NzZjMGU2MyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI4Ny41LjIxNy4xNTEiXSwidHlwZSI6ImNsaWVudCJ9XX0.NkweY4P6grwCIP3A4qJMDD_ULGVeNiBZBheewQeBZAuGSDnllyQpTFv_tyf9HyN-wrTZiEMjgOhWnGo28gisfA"; // Sostituisci con il tuo token

// Funzione per creare una card dinamicamente
function createCard(cardData) {
    const cardContainer = document.getElementById('card-container');

    // Creazione del contenitore della card
    const card = document.createElement('div');
    card.className = 'card';

    // Creazione dell'immagine
    const img = document.createElement('img');
    img.setAttribute('src', cardData.iconUrls.medium);
    img.setAttribute('alt', cardData.name);
    card.appendChild(img);

    // Creazione del titolo
    const title = document.createElement('h3');
    title.textContent = cardData.name;
    card.appendChild(title);

    // Creazione del contenuto
    const content = document.createElement('p');
    content.textContent = `Rarità: ${cardData.rarity}`;
    card.appendChild(content);

    // Inserimento della card nel contenitore principale
    cardContainer.innerHTML = ""; // Rimuove il messaggio di caricamento
    cardContainer.appendChild(card);
}

// Funzione per ottenere i dati dall'API
async function fetchCardData() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Errore nella chiamata API: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dati ricevuti:", data);

        // Usa il primo oggetto nell'array
        if (data.items && data.items.length > 0) {
            createCard(data.items[0]);
        } else {
            throw new Error("Nessuna card trovata.");
        }
    } catch (error) {
        console.error("Errore:", error.message);
        document.getElementById('card-container').innerHTML = "<p>Errore nel caricamento dei dati.</p>";
    }
}

// Esegui la funzione per ottenere i dati
fetchCardData();
