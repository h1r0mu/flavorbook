const { Builder, By, Capabilities, Key, until } = require("selenium-webdriver");
const capabilities = Capabilities.chrome();
// Chrome起動時のオプションを指定
capabilities.set("chromeOptions", {
  args: ["--headless", "--disable-gpu", "--window-size=1024,768"],
  w3c: false,
});

const search = async (query) => {
  // オプション指定ありでChromeを起動
  const driver = await new Builder().withCapabilities(capabilities).build();
  try {
    // トップページへアクセス
    await driver.get("http://localhost:3000/flavorbook");
    // 検索欄にキーワードを入力してEnter
    // await driver
    // .wait(until.elementLocated(By.name('q')), 5000)
    // .sendKeys(query, Key.RETURN)
    // 検索結果数のバッジの値を取得
    // const result = await driver
    // .wait(until.elementLocated(By.className('badge')), 5000)
    // .getText()
    // キーワードと結果の値を出力
    // console.log(`${query}: ${result}`)
  } catch (e) {
    // console.log(e)
  } finally {
    // Chromeを終了
    driver && (await driver.quit());
  }
};

search("selenium");
