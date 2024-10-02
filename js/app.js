// Color Patterns
const colors = [['rgb(117.2591014775547,181.9100072939132,197.88742369812599)',
        'rgb(225.58628210270368,131.6918325737063,225.19477985507964)'],
    ['rgb(7.980639840514715,58.739542826551435,205.68980235222972)',
        'rgb(167.24180377252725,229.841263006357,68.63854475966133)'],
    ['rgb(6.996569017189822,228.95891435869962,94.43261591554449)',
        'rgb(75.57517645918804,186.40056890482833,149.05576896284217)'],
    ['rgb(20.623293874724222,143.25991448337382,211.90834576413963)',
        'rgb(6.377315244055227,200.27622136113382,33.06752591430571)'],
    ['rgb(200.35410261009693,173.42224654830932,145.02952225985726)',
        'rgb(75.4125911901502,208.94242964832114,39.59383714760893)'],
    ['rgb(188.59665690339554,96.11730094091426,81.66462663190408)',
        'rgb(210.14832813610641,153.63004567001235,212.9153616904573)'],
    ['rgb(142.77249776476785,108.27407168680614,227.47099491374453)',
        'rgb(230.8389640905007,157.70292604831036,93.46799684554593)'],
    ['rgb(117.45276099094335,70.14328413511942,98.49473727585881)',
        'rgb(175.22427008693353,178.90231920200264,24.625536772565894)'],
    ['rgb(184.56304766141932,101.7129389667093,169.34005521202775)',
        'rgb(218.1852374078765,160.13571369227623,18.939077780505496)'],
    ['rgb(36.32865263542327,117.29153650663875,20.76096941997895)',
        'rgb(241.67674683995475,192.08267670470545,121.19648165552037)'],
    ['rgb(189.69127921155115,20.869654364559345,84.42072047213799)',
        'rgb(178.84226621769284,173.34156966444039,24.364810104278238)'],
    ['rgb(172.6511109621945,213.03682428507028,32.69278740930532)',
        'rgb(235.0829613148679,191.17164668693937,151.21363882746627)'],
    ['rgb(6.253588343101875,206.04778527596787,70.77742076048375)',
        'rgb(94.47262336852575,145.61701886263728,235.33228963898344)'],
    ['rgb(67.37159547780956,96.98291466213063,145.70909989306352)',
        'rgb(206.13809486251364,211.033245069223,27.433707906826783)'],
    ['rgb(183.14637152458621,4.0185629650855725,113.5614893523276)',
        'rgb(137.41485357164632,178.83908417413014,149.33383165552752)'],
    ['rgb(42.637175970916324,252.8326614979777,104.77453642424976)',
        'rgb(188.63802509934163,233.77477201802813,151.02443892322148)'],
    ['rgb(84.80365086937992,79.756753251232,248.16073132552015)',
        'rgb(46.85007318353149,236.38079335208266,221.39916633370353)'],
    ['rgb(233.57430842784987,66.58515835617575,36.26052858944101)',
        'rgb(17.162386066160117,156.6869529973867,33.29149334810301)'],
    ['rgb(241.05593595443943,169.70154213193743,129.01140236857054)',
        'rgb(102.150961402531,168.91468623837787,252.3603636124977)'],
    ['rgb(175.7104896647179,209.63659207764834,161.3453543361062)',
        'rgb(31.542181101213647,147.02764399214587,26.70680885406944)'],
    ['rgb(226.75187248283297,68.45456529635945,111.91253238051087)',
        'rgb(209.7388320606481,201.68385735476895,210.99203197508686)'],
    ['rgb(219.96648093639243,122.61241204946258,9.539515212970828)',
        'rgb(195.53494537744007,97.16841924635446,19.92352873076461)'],
    ['rgb(235.85181194491952,217.45305260405527,250.07637020600703)',
        'rgb(111.59144889862084,195.58268892804708,167.6931825780061)'],
    ['rgb(42.17843354901685,65.23294683136685,237.1348032581283)',
        'rgb(224.28385591031753,186.53517362872722,150.05421566797344)']];
// const prepareTable = (data,labels)=>{
//     let table = document.createElement('table');
// }
// This function analyses the url and extracts important imformation for plotting the graph
const analyseUrl = () => {
    // This function uses pure js to get a param from url
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    // These are the params we are looking for
    let important = ['n', 'algo', 'typex', 'typey', 'algo'];
    let object = {};
    for (let i in important) {
        // The url has a special meaning for + so, it gives back a whitespace in place of +
        // This if statement deals with that problem
        if (['3x 3', '3x 1'].includes(getParameterByName(important[i]))) {
            object[important[i]] = getParameterByName(important[i]).replace(' ', '+');
        }
        else {
            object[important[i]] = getParameterByName(important[i]);
        }
    }
    return object;
};
const isFloat = a => !!a.toString().match(/^[-+]?[0-9]+\.[0-9]+$/);
// This funtions takes in a number and an algorithm, then makes data by iterating
const prepareData = (n, algo) => {
    // The data is stored along labels which show at what moment or index, a value is present in the chart
    let data = [];
    let count = 0;
    let labels = [];
    if (isFloat(n)) {
        algo = algorithmFloat(algo);
        while (n != 1) {
            // This is an iteration limit, in case the algorithm tend to infinity, this will break the loop to prevent crashing
            if (count > 2500) {
                break;
            }
            if (n >= Math.pow(10, 120)) {
                break;
            }
            data.push(n);
            labels.push(count);
            n = algo(n);
            count += 1;
        }
    }
    else {
        algo = algorithmInt(algo);
        n = BigInt(n);
        while (n != 1n) {
            // This is an iteration limit, in case the algorithm tend to infinity, this will break the loop to prevent crashing
            if (count > 2500) {
                break;
            }
            if (n >= BigInt(Math.pow(10, 120))) {
                break;
            }
            data.push(n);
            labels.push(count);
            n = algo(n);
            count += 1;
        }
    }
    data.push(n);
    labels.push(count);
    // It returns an object with data and labels
    return { number: data[0], data: data.map(a => parseFloat(a)), labels: labels };
};
// This function plots the chart
const plot = (dataSet) => {
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataSet.labels,
            datasets: dataSet.sets
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'rgb(255, 255,255)'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    type: dataSet.typey,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgb(255,255,255,0.2)',
                    }
                },
                x: {
                    type: dataSet.typex,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgb(255,255,255,0.2)',
                    }
                }
            }
        }
    });
    // Setting the dimensions of canvas
    document.getElementById('chartDiv').style.width = window.innerWidth * 0.98 + 'px';
    document.getElementById('chartDiv').style.height = window.innerHeight * 0.5 + 'px';
};
// Simple function to make chart responsive
window.addEventListener('resize', () => {
    document.getElementById('chartDiv').style.width = window.innerWidth * 0.98 + 'px';
    document.getElementById('chartDiv').style.height = window.innerHeight * 0.5 + 'px';
});
// This is the main binding function
const process = () => {
    // Gets the url properties and validates them
    // This also gives the fallback values in case the url is incomplete or damaged
    let urlProps = analyseUrl();
    try {
        urlProps['n'].toString();
    }
    catch (_a) {
        urlProps['n'] = 27;
    }
    let typex = ['logarithmic', 'linear'].includes(urlProps['typex']) ? urlProps['typex'] == 'logarithmic' ? 'logarithmic' : 'linear' : 'linear';
    let typey = ['logarithmic', 'linear'].includes(urlProps['typey']) ? urlProps['typey'] == 'logarithmic' ? 'logarithmic' : 'linear' : 'linear';
    let algo = !!!urlProps['algo'] ? "3x+1" : urlProps['algo'];
    let res = '';
    // This processes multiple numbers and makes an array out of them
    // It also removes duplicates
    if (urlProps['n'].toString().includes(',')) {
        let numbers = urlProps['n'].toString().replace(/\s+/g, '').split(',');
        res = numbers.map((a) => parseFloat(a)).filter(a => !!a);
        res = res.filter((c, i) => res.indexOf(c) === i);
        if (res.length == 0) {
            res = [27];
        }
    }
    else {
        res = parseFloat(urlProps['n']);
        if (res < 0 || !res) {
            res = [27];
        }
        else {
            res = [res];
        }
    }
    // Creating a dataset
    let dataSet = {
        typex: typex,
        typey: typey,
        numbers: res,
        sets: [],
        labels: []
    };
    // This updates the validated values to the form
    document.getElementById('number').value = dataSet.numbers.join(',');
    document.getElementById('typex').value = dataSet.typex;
    document.getElementById('typey').value = dataSet.typey;
    document.getElementById('algo').value = algo;
    // This makes a dataset for each number found in the query
    for (let i = 0; i < res.length; i++) {
        // let col = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        // let col2 = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        let color = colors[Math.floor(Math.random() * colors.length)];
        // Getting data and labels for the number
        let dt = prepareData(res[i], algo);
        let obj = {
            label: `${res[i]}`,
            data: dt.data,
            color: 'rgba(255,255,255)',
            lineTension: 0.24,
            backgroundColor: [
                color[0]
            ],
            borderColor: [
                color[1]
            ],
            borderWidth: 0.5
        };
        // The labels are set to be the one with most iterations to accomodate all lines
        if (dataSet.labels.length < dt.labels.length) {
            dataSet.labels = dt.labels;
        }
        // Adding data of all numbers to one array
        dataSet.sets.push(obj);
    }
    // console.log(dataSet);
    return dataSet;
};
// This function stores all the algorithms
const algorithmInt = (algo) => {
    let res;
    switch (algo) {
        case "3x+1":
            res = (a) => a % 2n == 0n ? a / 2n : 3n * a + 1n;
            break;
        case "4x-4":
            res = (a) => a % 2n == 0n ? a / 2n : 4n * a - 4n;
            break;
        case "3x-3":
            res = (a) => a % 3n == 0n ? a / 3n : 3n * a - 3n;
            break;
        case "3x+3":
            res = (a) => a % 3n == 0n ? a / 3n : 3n * a + 3n;
            break;
        //   case "4x-2":
        //     res = (a:bigint) => a % 2n == 0n ? a / 2n : 4n * a - 2n
        //     break;
        case "2x-2":
            res = (a) => a % 2n == 0n ? a / 2n : 2n * a - 2n;
            break;
        default:
            res = (a) => a % 2n == 0n ? a / 2n : 3n * a + 1n;
            break;
    }
    return res;
};
const algorithmFloat = (algo) => {
    let res;
    switch (algo) {
        case "3x+1":
            res = (a) => a % 2 == 0 ? a / 2 : 3 * a + 1;
            break;
        case "4x-4":
            res = (a) => a % 2 == 0 ? a / 2 : 4 * a - 4;
            break;
        case "3x-3":
            res = (a) => a % 3 == 0 ? a / 3 : 3 * a - 3;
            break;
        case "3x+3":
            res = (a) => a % 3 == 0 ? a / 3 : 3 * a + 3;
            break;
        //   case "4x-2":
        //     res = (a:bigint) => a % 2n == 0n ? a / 2n : 4n * a - 2n
        //     break;
        case "2x-2":
            res = (a) => a % 2 == 0 ? a / 2 : 2 * a - 2;
            break;
        default:
            res = (a) => a % 2 == 0 ? a / 2 : 3 * a + 1;
            break;
    }
    return res;
};
// Execute on load
plot(process());
// This makes the url and changes it in the bar
document.getElementById('visualize').addEventListener('click', () => {
    document.getElementById('chartDiv').innerHTML = '<canvas id="chart"></canvas>';
    window.history.pushState('page2', 'Title', `/collatz/index.html?typex=${document.getElementById('typex').value}&typey=${document.getElementById('typey').value}&n=${document.getElementById('number').value}&algo=${document.getElementById('algo').value}`);
    plot(process());
});
let general = "Here x has to be a positive, non-zero and real number.";
let patterns = {
    "3x+1": {
        divided: 2,
        if: 2,
        other: general,
        tends: 1,
        else: "(3 * x) + 1",
    },
    "4x-4": {
        divided: 2,
        if: 2,
        other: general,
        tends: 1,
        else: "(4 * x) - 4",
    },
    "3x+3": {
        divided: 3,
        if: 3,
        other: general,
        tends: 1,
        else: "(3 * x) + 3",
    },
    "2x-2": {
        divided: 2,
        if: 2,
        other: "Here x has to be in the range [2,Infinity).",
        tends: 1,
        else: "(2 * x) - 2",
    },
    "3x-3": {
        divided: 3,
        if: 3,
        other: "Here x has to be a natural number.",
        tends: 1,
        else: "(3 * x) - 3"
    }
};
for (let i in Object.keys(patterns)) {
    document.querySelector('#main-table').getElementsByTagName('tbody')[0].innerHTML += `
    <tr>
    <td>${Object.keys(patterns)[i]}</td>
    <td>${patterns[Object.keys(patterns)[i]]['if']}</td>
    <td>${patterns[Object.keys(patterns)[i]]['divided']}</td>
    <td>${patterns[Object.keys(patterns)[i]]['else']}</td>
    <td>${patterns[Object.keys(patterns)[i]]['tends']}</td>
    <td>${patterns[Object.keys(patterns)[i]]['other']}</td>
    </tr>
    `;
}
// if(window.innerWidth  < 695){
//     window.alert("Your screen size is a bit small. This might not work as intended.")
// }
document.getElementById('png').addEventListener('click', (e) => {
    e.preventDefault();
    var a = document.createElement("a");
    let can = document.getElementById('chart');
    a.href = can.toDataURL();
    document.body.appendChild(a);
    a.download = 'visualize.png';
    a.innerHTML = 'n';
    a.click();
    a.remove();
});
document.getElementById('jpeg').addEventListener('click', (e) => {
    e.preventDefault();
    var a = document.createElement("a");
    let can = document.getElementById('chart');
    a.href = can.toDataURL('image/jpeg');
    document.body.appendChild(a);
    a.download = 'visualize.jpeg';
    a.innerHTML = 'n';
    a.click();
    a.remove();
});
const copy = (text) => {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);
    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
};
const notify = (msg) => {
};
document.getElementById("share").addEventListener('click', () => {
    let loc = window.location;
    let text = loc.origin + loc.pathname + loc.search;
    copy(text);
    alert("Link Copied to Clipboard!")
});
