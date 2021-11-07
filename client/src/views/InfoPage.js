import React from "react";
import Navbar from "../components/Navbar";

const InfoPage = () => {

    return(
        <>
        <Navbar />
        <div className="container-fluid pb-5 bg-light">
            <h1 className="display-1 text-center">Sugar the Sweet Devil</h1>
            <img src="https://www.avmi.net/wp-content/uploads/2015/11/sugar-evil-665x372.jpg" className="img-fluid rounded mx-auto d-block" alt="sugar devil" />
            <p className="text-center my-1">The average American consumes approximately <mark>60 pounds</mark> of sugar per year</p>
            <hr />
            <div className="mx-5">

                <h1 className="display-6 text-center">How the Sugar Industry Shifted Blame to Fat</h1>
                <p>
                    In the 1960s the sugar industry leaders paid scientist to downplay the link between sugar and heart diesase while promoting saturated fat as the main culprit, recently released historical document show. The next five decades of research with the role of nutrition and heart disease may have been largely shaped by the sugar industry. In 2015, <a target="_blank" href="https://well.blogs.nytimes.com/2015/08/09/coca-cola-funds-scientists-who-shift-blame-for-obesity-away-from-bad-diets/?mtrref=undefined&gwh=32AFB80A3432462D26432F7C80E428F4&gwt=regi&assetType=REGIWALL">an article in the New York Times</a> revealed that Coca-Cola, the world's largest producer of sugary beverages, had provided millions of dollars in funding to researchers who sought to downplay the link between sugary drinks and obesity. More recent reports show that many other food industry leaders continue to influence nutrition science. The U.S. Food and Drug Adminstration (FDA) created the nutrition fact labels, which you can find on the back of all food products, based on the nutrition science. For many of the past decades, health officials encouraged Americans to reduce their fake intake, leading to many people consuming low-fat, high sugar foods that some health experts today now blame for the rise in obesity.
                </p>
                <img src="https://lanekenworthy.files.wordpress.com/2012/05/whythesurgeinobesity-figure1-version1.png?w=584" className="rounded mx-auto d-block w-50" alt="sugar obesity chart" />
                <hr />
                
                <h1 className="display-6 text-center">Impact on Your Heart <i className="far fa-heart"></i></h1>
                <p>
                    The higher intake of added sugar results in a higher risk for heart disease. In a study published in 2014 in JAMA Internal Medicine, Dr. Hu and his colleagues found an association between a high-sugar diet and a greater risk of dying from heart disease. Over the course of the 15-year study, people who got 17% to 21% of their calories from added sugar had a 38% higher risk of dying from cardiovascular disease compared with those who consumed 8% of their calories as added sugar. Sugar has many indirect connections to heart health. High amounts of sugar can overload the liver into a unhealthy fatty liver contributing to diabetes leading to heart disease. Higher blood pressure, inflamation within the body, weight gain, diabetes, amd fatty liver disease are all effects of added sugar intake which increases risk fo heart attack and stroke.
                </p>
                <hr />

                <h1 className="display-6 text-center">How Much Sugar to Consume?</h1>
                <p>
                    American adults consume an average of 77 grams of sugar per day. This adds up to around 60 pounds of added sugar annually. The numbers are even worse for children. American kids consume 81 grams per day, equaling over 65 pounds of added sugar per year. The American Heart Association's (AHA) recommendations for sugar intake:
                </p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Teaspoons</th>
                            <th scope="col">Grams</th>
                            <th scope="col">Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-primary">
                            <th scope="row">Men</th>
                            <td>9</td>
                            <td>38</td>
                            <td>150</td>
                        </tr>
                        <tr className="table-danger">
                            <th scope="row">Women</th>
                            <td>6</td>
                            <td>25</td>
                            <td>100</td>
                        </tr>
                        <tr className="table-warning">
                            <th scope="row">Children</th>
                            <td>3 - 6</td>
                            <td>12 - 25</td>
                            <td>50 - 100</td>
                        </tr>
                    </tbody>
                </table>
                <p><small><mark>**One 12-oz can of Coke contains 8 teaspoons (32 grams) of added sugar**</mark></small></p>
                <hr />

                <h1 className="display-6 text-center">Reduce Your Consumption <i className="fas fa-arrow-down"></i></h1>
                <p>
                    Excess consumption of sugar in beverages, contributes to weight gain by tricking your body into turning off its appetite-control system because liquid calories are not as satisfying as calories from solid foods. This is why it is easier for people to add more calories to their regular diet when consuming sugary beverages. Beverages are the leading category source of added sugars at 47% of all added sugars with snacks and sweets the next biggest contributor of added sugars at 31%.
                </p>
                <p>Avoid the following foods as much as possible:</p>
                <ul>
                    <li><span className="bold">Soft drinks</span>: Sugar-sweetened beverages are unhealthy. You should avoid these like the plague</li>
                    <li><span className="bold">Fruit juices</span>: Fruit juices contain the same amount of sugar as soft drinks. Choose whole fruit instead of fruit juice.</li>
                    <li><span className="bold">Candies and sweets</span>: You should drastically limit your consumption of sweets.</li>
                    <li><span className="bold">Baked goods</span>: Cookies, cakes, etc. These tend to be very high in sugar and refined carbohydrates.</li>
                    <li><span className="bold">Fruits canned in syrup</span>: Choose fresh fruits instead.</li>
                    <li><span className="bold">Low-fat or diet foods</span>: Foods that have had the fat removed from them are often very high in sugar.</li>
                </ul>
                <p>You MUST read nutrition labels as even foods diguised as "healthly options" can be loaded with added sugars. Sugar comes in many alternative names that are listed on the backs of products. These include sugar, sucrose, high-fructose corn syrup (HFCS), dehydrated cane juice, fructose, glucose, dextrose, syrup, cane sugar, raw sugar, corn syrup and more. Fortunately, food manufacturers are required to list the amount of added sugars on the Nutrition Facts label by mid 2021 or earlier depending on the size of the company.  A recent analysis found that this labeling could potentially prevent nearly 1 million cases of cardiovascular disease and type 2 diabetes over the next two decades.  Listing the total amount of added sugars means that consumers will no longer have to search through the many different aliases for added sugars to try and determine how much added sugar a food or drink contains.</p>

            </div>
        </div>
        </>
    )
}

export default InfoPage
