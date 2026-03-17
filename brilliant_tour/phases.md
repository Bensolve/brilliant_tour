That makes perfect sense. Breaking it into phases keeps us from getting overwhelmed and ensures the "Money Logic" is built correctly from the ground up.

Here is the **Brilliant Tour Development Roadmap**, divided into 5 clear phases.

---

### Phase 1: The Foundation (Database & Roles)

**Goal:** Get the "skeleton" of the app ready to handle different users and money.

* **Database Update:** Run the SQL script to add `wallet_balance`, `roles`, and `scout_bounty` to Supabase.
* **User Roles:** Set up the logic so the app knows if a user is a **Traveler**, a **Scout**, or an **Operator**.
* **Trip Setup:** Update the "Add Trip" form so Operators can set the "Scout Reward" (Bounty) in GH₵.

### Phase 2: The Viral Engine (Magic Links & WhatsApp)

**Goal:** Give Scouts the tools to start marketing on WhatsApp.

* **Magic Link Generator:** Build the logic that attaches a `?ref=scout_id` to every trip URL.
* **WhatsApp "Share" Button:** Create the button that opens WhatsApp with a pre-written message and the Scout's link.
* **Referral Tracking:** Write a small script that "remembers" who the Scout is when a Traveler clicks the link.

---

### Phase 3: The Money Machine (Webhooks & Splits)

**Goal:** Automate the 3-way split so you get paid while you sleep.

* **Paystack Webhook:** Move the payment logic away from the browser and onto the server (where it is safe).
* **The Split Logic:** Write the function that calculates:
* 15% of bounty → **Your Admin Wallet**
* 85% of bounty → **Scout Wallet**
* Total - Bounty → **Operator Wallet**


* **Booking Confirmation:** Automatically mark the trip as "Paid" once the MoMo payment is verified.

### Phase 4: User Portals (Wallets & Payouts)

**Goal:** Let users see their earnings and withdraw to MoMo.

* **Scout Dashboard:** A simple page for Scouts to see "Total Clicks" and "Money Earned."
* **The Virtual Wallet:** A UI showing the user's current GH₵ balance.
* **Withdrawal Request:** A "Cash Out" button that notifies you to send the MoMo payment to their phone.

---

### Phase 5: World Cup Scale-up (The Launch)

**Goal:** Prepare for high volume and the 2026 FIFA World Cup rush.

* **World Cup Branding:** Add a "World Cup 2026" category for Match-Day Shuttles.
* **Group Booking Logic:** Add a feature where the Scout gets a "Bonus" if they bring 10+ people.
* **Speed Optimization (Lite Mod):** Make sure the site stays fast on slow data during big match days.

---

### Which Phase do we start with?

Since we've already discussed the **Business Model** and updated the **Types**, we are technically at the start of **Phase 1**.

**Would you like me to give you the code for the updated "Add Trip" form so the Operator can start setting their prices and Scout rewards?**