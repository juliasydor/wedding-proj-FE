## During creation

We will develop a **wedding website** project where the couple can create a **customizable** site with information such as:

* Event location
* Dress code
* Gift list
* Guest list

The product will have distinct user journeys:

* **Guests**
* **Couple (sign-up + onboarding)**
* **Couple (login + editing the already-created site)**

---

## Journey — Couple (new user)

1. **Home**
2. **Registration (sign-up)**
3. **Onboarding (mandatory, cannot be skipped)**
   3.1. Couple’s names
   3.2. Wedding date
   3.3. Wedding location
   3.4. Dress code
   3.5. Wedding theme
4. **Banking information** *(optional — can be skipped)*

   * Even though it’s optional, the site must display **persistent alerts** encouraging the user to add a bank account, enabling **financial routing** for purchases made through the gift list.
5. **Choose the site template**
6. **Configure/edit the gift list**
7. **Site preview** with the selected template and provided data
8. **Generate the QR Code** and the site **URL**
9. **Site page (couple edit mode)**
10. **Full navbar** (contextual for couples and guests)

---

## Journey — Guest (accessing the site)

1. **Login / Sign-up** (first access)
2. **View the couple’s site**
3. When clicking **“Give a Gift”**:

   * **Payment checkout**
4. **Post-payment**

   * **Success** page
   * **Error** page
   * **Progress/processing** page (when applicable)

---

## UI and Frontend Architecture Requirements

* Use the **templates provided in the images** as a reference for **all** pages.
* Build a **reusable, componentized** frontend.
* Create a **global.css** and **always reuse** the colors and fonts defined there (no “loose” colors in the code).
* Use:

  * **TailwindCSS**
  * **Zustand**
  * **i18n (PT and EN)** — the entire site must be available in **Portuguese and English**
  * **Shadcn**
  * **TanStack Table**
  * **Composition pattern**
  * **Feature-Sliced Design**
  * **Clear separation between UI and logic using custom hooks**
  * **Full use of Next.js**
  * **SSR**
  * **Next.js cache**
  * **Server Actions**
  * **Atomic Design**

### Color palette (mandatory tokens)

* Secondary color (e.g., buttons): **#ea2e5b**
* Primary color (e.g., background): **#261516**
* Tertiary color: **#F1557C**
* Quaternary color: **#221015**
* Subtitle text: **#8D968F**
* Primary font color: **#FFFFFF**
* Inputs: **#271C1E**

---

## Final deliverables

1. **Documentation of the backend endpoints** required:

   * Complete list of endpoints
   * Responsibility of each endpoint
   * Where and how they will be consumed in the frontend (layer/service/hook)
2. **Brief description of each page’s content**
3. **Suggested commit messages** following the pattern:

   * `git commit -m "feat: ..."`

All page images are in the `@template-casamento` directory. Use that design as the basis for all pages.


Use some of this special effects:

2. Animations and Transitions
Animations are crucial for bringing a romantic feel to life. Keyframes (@keyframes) and the animation CSS property are fundamental tools. 
Falling Elements: Creating animations where elements like hearts or flower petals gently fall from the top of the screen using transform: translateY() and variable durations to create a natural, continuous effect.
Pulsing/Beating: Animating heart shapes to scale up and down (using transform: scale()) to simulate a heartbeat effect.
Subtle Movement: Avoiding jarring movements and using smooth cubic-bezier timing functions to ensure animations feel gentle and elegant.
Hover Effects: Using the :hover pseudo-class with transition properties to add subtle interactive feedback, such as slight scaling or shadow changes, when a user interacts with elements like buttons or images. 
3. Special Effects
Glowing Effects: Applying text-shadow or box-shadow with soft, colored glows can add a dreamy, warm feel, especially to text or buttons.
Text Effects: Using wavy or sparkling text animations (often involving JavaScript for more complex effects) can make messages stand out in a charming way.
Shapes: Utilizing CSS to create non-standard shapes, most notably hearts, through clever use of ::before and ::after pseudo-elements and transform properties. 
Resources and Examples
Heart Animation with JavaScript & CSS: You can see how to create a heart confetti effect in this YouTube tutorial.
Romantic Web Page Code Examples: Various code snippets and full projects, including proposal pages and love animations, are shared on platforms like DEV Community and GitHub.
CSS Animation Libraries: Libraries like Animate.css provide pre-built, customizable animations that can add life to elements quickly. 