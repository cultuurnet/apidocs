# Getting started

## 1. Registering a widget project 

Before you can start building your widget you must make a widget project on our [self-service platform Projectaanvraag](https://projectaanvraag.uitdatabank.be). The registration process is very simple and only takes a few minutes. 

The created widget project will use event data from our test environment. No payment is required until you decide you want to use real event data.

https://www.youtube.com/watch?v=X0uplBw98gg

<!-- theme: success -->
> Once you have created your widget project, you're all set to start building your widget! 

## 2. Building your widget
### Choosing a template 🗂️

To help you get started quickly, we offer 4 different templates:

1. **Leeg**: You start from a blanc layout that you then expand yourself by adding rows and assigning blocks (e.g. search box or search results) to these rows.
2. **Agenda**: This is the most used template. This templates contains two rows. The top row contains a a search box (full length), and the second row contains facets on the left s ide and search results at the center.
3. **Tips**: This template can be used to make a short list of events that you want to highlight. The tips widget serves as a teaser for the full event calendar. The tips widget is often used to generate traffic to the full calendar. Therefore it is usually embedded on the home page or another frequently visited page.
4. **UiTPAS**: This is the same template as the `agenda` template, but with all the UiTPAS setting already enabled for you.

Regardless of the template you pick, you can later on extensively customize your widget to your own preferences and taste:

* by changing the layout: adding, moving or deleting rows and blocks
* by configuring the different blocks: determine which events and information you want to show in your agenda

👉 [Learn more about widget templates](./templates.md)

### Configuring your widget 🏗️

Now that you've chosen a template it's time to define:

* which events you want to display in your agenda
* which info you want to show about the events

The way of configuring is very simple and is mainly done by ticking and unchecking checkboxes.

👉 [Learn more about the  configuration settings](./configuration.md)

### Publishing and embedding your widget 💾

Once you're satisfied with the configuration you've done in step 2 you can publish your widget. The publish action will save all configuration changes you've made on the `<script>` tag of your widget.

Now you can copy the unique `<script>` tag to embed it on the page of your website where you want to show the agenda.

> As long as your widget uses event data from our test environment, we recommend to integrate the `<script>` tag on the staging environment of your webiste, or alternatively on a hidden page of your production website.

👉 [Learn more about publishing & embedding](./publish-and-embed-on-your-website.md)

### Styling your widget 🎨

Once embedded in a website, the widget will automatically inherit the CSS styles of the guest website.

In addition, you can also define your own CSS rules in the widget builder to finetune the widget to the design of your website. If CSS is not your cup of coffee, you can also use one of the predefined themes we provide in the widget builder.

👉 [Learn more about widget styling](./styling.md)

## 3. Activating your widget project to use real event data

In order to use real event data in your widget you must activate your widget project on [Projectaanvraag](https://projectaanvraag.uitdatabank.be). When activating you agree with the payment of a yearly fee.

<!-- theme: success -->
> Once activated, your widget will automatically start using event data from the production environment of UiTdatabank!
