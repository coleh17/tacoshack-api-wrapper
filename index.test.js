const TacoShack = require("./index.ts");

test("initizalize class", () => {
    let ts = new TacoShack();
    expect(ts.testFunc()).toBe(5);
})

test("test fetch", async () => {
    let ts = new TacoShack();
    await ts.testFetch()
        .then(shack => {
            expect(shack.franchise).toBe("TOS");
        })
        .catch(err => { console.log(err); })
})

test("invalid snowflake provided", async () => {
    let ts = new TacoShack();
    await ts.fetchShack('123456')
        .then(shack => { })
        .catch(err => {
            expect(err.message).toBe("Invalid User ID provided, must be a Discord snowflake.");
        })
})

test("id without a shack", async () => {
    let ts = new TacoShack();
    await ts.fetchShack("467592087185915924")
        .then(shack => { })
        .catch(err => {
            console.log(err.message);
            expect(err.message).toBe("Bad request to API, fetch failed.");
        })
})

test("fetch shack", async () => {
    let ts = new TacoShack();
    await ts.fetchShack('280428044156534784')
        .then(shack => {
            expect(shack.franchise).toBe("TOS");
        })
        .catch(err => { console.log(err); })
})

test("fetch shack with params", async () => {
    let ts = new TacoShack();
    await ts.fetchShack('280428044156534784', { data: ["name", "balance"] })
        .then(shack => {
            expect(shack.franchise).toBe(undefined);
        })
        .catch(err => { console.log(err); })
})