# Exclusive — Site e-commerce

Site vitrine e-commerce "Exclusive", réalisé en **HTML, CSS et JavaScript natifs** (aucune dépendance à installer, aucun framework), à partir d'une maquette Figma.

## Lancer le site

Aucune installation n'est nécessaire.

1. Décompresse l'archive si ce n'est pas déjà fait.
2. Ouvre `index.html` directement dans ton navigateur (double-clic, ou glisser-déposer dans la fenêtre).

Le site fonctionne entièrement en local. Pour un rendu identique à la production (notamment si tu modifies le code avec un live-reload), tu peux aussi le servir avec une extension comme *Live Server* (VS Code) ou :

```bash
# Python
python3 -m http.server 8000

# puis ouvrir http://localhost:8000 dans le navigateur
```

## Structure du projet

```
Exclusive/
├── index.html          Page principale (toutes les sections du site)
├── styles.css           Feuille de styles complète (variables CSS, layout, responsive)
├── script.js             Interactivité (countdown, menu mobile, panier, etc.)
├── image/                Visuels produits, bannières, logos
├── icons/                Icônes SVG (catégories, livraison, support, garantie)
└── README.md             Ce fichier
```

## Fonctionnalités

- **En-tête** : recherche, favoris, panier, menu de navigation (avec menu hamburger en dessous de 760px)
- **Hero banner** : bannière principale avec slider (points cliquables) + bannière promo musique
- **Flash Sales** : grille de produits avec countdown réel (jours/heures/minutes/secondes)
- **Browse by Category** : catégories cliquables
- **Best Selling / Explore Products / New Arrival** : grilles de produits et bloc "New Arrival" en mise en page asymétrique (CSS Grid)
- **Features** : livraison, support, garantie
- **Footer** : newsletter (avec validation), liens, réseaux sociaux, téléchargement d'application
- **Bouton "retour en haut"** après défilement

## JavaScript (`script.js`)

| Fonction | Rôle |
|---|---|
| `initMobileNav()` | Ouvre/ferme le menu sur mobile |
| `initCountdowns()` | Fait décompter les deux comptes à rebours en temps réel |
| `initHeroDots()` | Gère l'état actif des points du slider |
| `initWishlistButtons()` | Bascule l'état "favori" des produits + compteur du header |
| `initCartButtons()` | Incrémente le compteur du panier au clic sur "Add to Cart" |
| `initBackToTop()` | Affiche/masque et gère le bouton de retour en haut |
| `initNewsletterForm()` | Valide l'email et affiche un message de confirmation |
| `initNavArrows()` | Fait défiler horizontalement les sections au clic sur les flèches |

Le panier et la wishlist sont gérés uniquement côté interface (aucune persistance, aucun appel serveur) : c'est une démonstration visuelle, pas une boutique fonctionnelle. Pour aller plus loin, il faudrait brancher une vraie logique de panier (stockage, API, paiement).

## Personnalisation rapide

- **Couleurs** : toutes les couleurs clés sont centralisées dans `:root` en haut de `styles.css` (`--color-accent`, `--color-border`, etc.) — change-les à un seul endroit pour que tout le site suive.
- **Durée des countdowns** : modifiable directement dans `index.html` via les attributs `data-duration-days`, `data-duration-hours`, etc. sur les conteneurs `#flashCountdown` et `#musicCountdown`.
- **Produits** : chaque carte produit (`.product-card`) est un bloc HTML autonome ; duplique-le et change l'image, le titre et le prix pour ajouter un article.

## Navigateurs supportés

Testé sur les navigateurs modernes à jour (Chrome, Firefox, Edge, Safari). Utilise CSS Grid, Flexbox et les variables CSS — pas de support prévu pour Internet Explorer.
