import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Selector from "./selector.js";
import Result from "./result.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    const flavors = props.flavorNames.map((flavor) => new Flavor(...flavor));
    this.state = {
      tiles: flavors.map((flavor) => {
        return {
          flavor: flavor,
          selected: flavor.level == 0 ? true : false,
        };
      }),
    };
  }

  getTiles(page) {
    return this.state.tiles.filter((tile) => tile.flavor.level == page);
  }

  getVisibleTiles(page) {
    let tiles = this.getTiles(page);
    if (page > 0) {
      const selectedParentFlavorNames = this.getTiles(page - 1)
        .filter((tile) => tile.selected)
        .map((tile) => tile.flavor.name);
      tiles = tiles.filter((tile) =>
        selectedParentFlavorNames.includes(tile.flavor.parentName)
      );
    }
    return tiles;
  }

  selectTile(page, flavorName) {
    const tiles = this.getVisibleTiles(page).slice();
    const tile = tiles.find((tile) => tile.flavor.name == flavorName);
    tile.selected = !tile.selected;
    this.setState(this.state.tiles.concat({ tiles: tiles }));
  }

  selectTiles(page) {
    const tiles = this.getVisibleTiles(page)
      .slice()
      .map((tile) => {
        tile.selected = true;
        return tile;
      });
    this.setState(this.state.tiles.concat({ tiles: tiles }));
  }

  unselectTiles(page) {
    const tiles = this.getVisibleTiles(page)
      .slice()
      .map((tile) => {
        tile.selected = false;
        return tile;
      });
    this.setState(this.state.tiles.concat({ tiles: tiles }));
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/">
              {<Redirect to="/page1" />}
            </Route>
            <Route
              path="/page1"
              render={() => {
                return (
                  <Selector
                    tiles={this.getVisibleTiles(0)}
                    page={0}
                    next="/page2"
                    onClickNext={() => this.selectTiles(1)}
                    onClickTile={(page, flavorName) =>
                      this.selectTile(page, flavorName)
                    }
                  />
                );
              }}
            />
            <Route
              path="/page2"
              render={() => {
                return (
                  <Selector
                    tiles={this.getVisibleTiles(1)}
                    page={1}
                    next="/page3"
                    prev="/page1"
                    onClickPrev={() => this.unselectTiles(1)}
                    onClickNext={() => this.selectTiles(2)}
                    onClickTile={(page, flavorName) =>
                      this.selectTile(page, flavorName)
                    }
                  />
                );
              }}
            />
            <Route
              path="/page3"
              render={() => (
                <Selector
                  tiles={this.getVisibleTiles(2)}
                  page={2}
                  next="/page4"
                  prev="/page2"
                  onClickPrev={() => this.unselectTiles(2)}
                  onClickTile={(page, flavorName) =>
                    this.selectTile(page, flavorName)
                  }
                />
              )}
            />
            <Route
              path="/page4"
              render={() => (
                <Result
                  tiles={this.state.tiles.filter((tile) => tile.selected)}
                  page={3}
                  next="/"
                  prev="/page3"
                />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  flavorNames: PropTypes.array,
};

class Flavor {
  constructor(name, level, parentName, url) {
    this.name = name;
    this.level = level;
    this.parentName = parentName;
    this.url = url;
  }
}

const FLAVOR_NAMES = [
  ["野菜", 0, null, "/static/Big/green_vegetative.jpg"],
  ["酸味／発酵", 0, null, "/static/Big/sour_fermented.jpeg"],
  ["フルーツ", 0, null, "/static/Big/fruity.jpg"],
  ["花", 0, null, "/static/Big/floral.jpg"],
  ["甘味", 0, null, "/static/Big/sweet.jpg"],
  ["ナッツココア", 0, null, "/static/Big/nutty_cocoa.jpg"],
  ["香辛料", 0, null, "/static/Big/spices.jpg"],
  ["焼き", 0, null, "/static/Big/roasted.jpg"],
  ["その他", 0, null, "/static/Big/other.jpg"],
  ["豆臭い", 1, "野菜", "./static/Medium/beany.jpg"],
  ["植物／野菜", 1, "野菜", "./static/Medium/green_vegetative.jpg"],
  ["生野菜", 1, "野菜", "./static/Medium/raw.jpg"],
  ["オリーブオイル", 1, "野菜", "./static/Medium/olive-oil.jpg"],
  ["酒／発酵", 1, "酸味／発酵", "./static/Medium/alcohol_fermented.jpg"],
  ["酸味", 1, "酸味／発酵", "./static/Medium/sour.jpg"],
  ["柑橘類", 1, "フルーツ", "./static/Medium/citrus_fruit.jpg"],
  ["その他の果実", 1, "フルーツ", "./static/Medium/other_fruit.jpg"],
  ["ドライフルーツ", 1, "フルーツ", "./static/Medium/dried_fruit.jpg"],
  ["ベリー", 1, "フルーツ", "./static/Medium/berry.jpg"],
  ["花", 1, "花", "./static/Medium/floral.jpg"],
  ["紅茶", 1, "花", "./static/Medium/black_tea.jpg"],
  ["甘い香り", 1, "甘味", "./static/Medium/sweet_aromatics.jpg"],
  ["総合的な甘味", 1, "甘味", "./static/Medium/overall_sweet.jpg"],
  ["バニラエッセンス", 1, "甘味", "./static/Medium/vanillin.jpg"],
  ["バニラ", 1, "甘味", "./static/Medium/vanilla.jpg"],
  ["黒砂糖", 1, "甘味", "./static/Medium/brown_sugar.jpg"],
  ["ココア", 1, "ナッツココア", "./static/Medium/cocoa.jpg"],
  ["ナッツ", 1, "ナッツココア", "./static/Medium/nutty.jpg"],
  ["香辛料", 1, "香辛料", "./static/Medium/brown_spice.jpg"],
  ["唐辛子", 1, "香辛料", "./static/Medium/pepper.jpg"],
  ["コショウ", 1, "香辛料", "./static/Medium/pungent.jpg"],
  ["穀物", 1, "焼き", "./static/Medium/cereal.jpg"],
  ["焦げ臭", 1, "焼き", "./static/Medium/burnt.jpg"],
  ["タバコ", 1, "焼き", "./static/Medium/tobacco.jpg"],
  ["パイプタバコ", 1, "焼き", "./static/Medium/pipe_tobacco.jpg"],
  ["化学薬品", 1, "その他", "./static/Medium/chemical.jpg"],
  ["紙／カビ", 1, "その他", "./static/Medium/paper_musty.jpg"],
  ["ハーブ", 2, "植物／野菜", "./static/Small/herb-like.jpg"],
  ["干し草", 2, "植物／野菜", "./static/Small/hay-like.jpg"],
  ["植物", 2, "植物／野菜", "./static/Small/vegetative.jpg"],
  ["ホウレンソウ", 2, "植物／野菜", "./static/Small/fermented.jpg"],
  ["生鮮野菜", 2, "植物／野菜", "./static/Small/vegetative.jpg"],
  ["さやえんどう", 2, "植物／野菜", "./static/Small/pear.jpg"],
  ["未成熟な野菜", 2, "植物／野菜", "./static/Small/fermented.jpg"],
  ["発酵しすぎ", 2, "酒／発酵", "./static/Small/fermented.jpg"],
  ["発酵", 2, "酒／発酵", "./static/Small/overripe.jpg"],
  ["ウィスキー", 2, "酒／発酵", "./static/Small/whiskey.jpg"],
  ["赤ワイン", 2, "酒／発酵", "./static/Small/rose.jpg"],
  ["リンゴ酸", 2, "酸味", "./static/Small/apple.jpg"],
  ["クエン酸", 2, "酸味", "./static/Small/sour_aromatics.jpg"],
  ["汗・足のにおい", 2, "酸味", "./static/Small/salty.jpg"],
  ["ぎんなん臭い", 2, "酸味", "./static/Small/grain.jpg"],
  ["酢", 2, "酸味", "./static/Small/cardboard.jpg"],
  ["酸っぱい香り", 2, "酸味", "./static/Small/sour_aromatics.jpg"],
  ["ライム", 2, "柑橘類", "./static/Small/lime.jpg"],
  ["レモン", 2, "柑橘類", "./static/Small/lemon.jpg"],
  ["オレンジ", 2, "柑橘類", "./static/Small/orange.jpg"],
  ["グレープフルーツ", 2, "柑橘類", "./static/Small/grapefruit.jpg"],
  ["洋梨", 2, "その他の果実", "./static/Small/pear.jpg"],
  ["桃", 2, "その他の果実", "./static/Small/peach.jpg"],
  ["青リンゴ", 2, "その他の果実", "./static/Small/apple.jpg"],
  ["マスカット", 2, "その他の果実", "./static/Small/musty_dusy.jpg"],
  ["パイナップル", 2, "その他の果実", "./static/Small/pineapple.jpg"],
  ["ザクロ", 2, "その他の果実", "./static/Small/pomegranate.jpg"],
  ["チェリー", 2, "その他の果実", "./static/Small/cherry.jpg"],
  ["ココナッツ", 2, "その他の果実", "./static/Small/coconut.jpg"],
  ["プルーン", 2, "ドライフルーツ", "./static/Small/petroleum.jpg"],
  ["レーズン", 2, "ドライフルーツ", "./static/Small/raspberry.jpg"],
  ["ストロベリー", 2, "ベリー", "./static/Small/strawberry.jpg"],
  ["ブルーベリー", 2, "ベリー", "./static/Small/blueberry.jpg"],
  ["ラズベリー", 2, "ベリー", "./static/Small/raspberry.jpg"],
  ["ブラックベリー", 2, "ベリー", "./static/Small/blackberry.jpg"],
  ["ジャスミン", 2, "花", "./static/Small/jasmine.jpg"],
  ["ローズ", 2, "花", "./static/Small/rose.jpg"],
  ["カモミール", 2, "花", "./static/Small/chamomile.jpg"],
  ["ハチミツ", 2, "黒砂糖", "./static/Small/honey.jpg"],
  ["キャラメリゼ", 2, "黒砂糖", "./static/Small/caramelized.jpg"],
  ["メイプルシロップ", 2, "黒砂糖", "./static/Small/maple_syrup.jpg"],
  ["シロップ", 2, "黒砂糖", "./static/Small/stale.jpeg"],
  ["ダークチョコレート", 2, "ココア", "./static/Small/dark_chocolate.jpg"],
  ["チョコレート", 2, "ココア", "./static/Small/chocolate.jpg"],
  ["アーモンド", 2, "ナッツ", "./static/Small/almond.jpg"],
  ["ヘーゼルナッツ", 2, "ナッツ", "./static/Small/hazelnut.jpg"],
  ["ピーナッツ", 2, "ナッツ", "./static/Small/peanuts.jpg"],
  ["クローブ", 2, "香辛料", "./static/Small/apple.jpg"],
  ["シナモン", 2, "香辛料", "./static/Small/sweet_aromatics.jpg"],
  ["ナツメグ", 2, "香辛料", "./static/Small/acrid.jpg"],
  ["アニス", 2, "香辛料", "./static/Small/anise.jpg"],
  ["麦芽", 2, "穀物", "./static/Small/grain.jpg"],
  ["穀物", 2, "穀物", "./static/Small/brown_roast.jpg"],
  ["焦げ豆", 2, "焦げ臭", "./static/Small/brown_roast.jpg"],
  ["煙", 2, "焦げ臭", "./static/Small/smoky.jpg"],
  ["灰っぽい", 2, "焦げ臭", "./static/Small/ashy.jpg"],
  ["燃えたゴム臭", 2, "焦げ臭", "./static/Small/brown_roast.jpg"],
  ["ゴム", 2, "化学薬品", "./static/Small/rubber.jpg"],
  ["スカンクの悪臭", 2, "化学薬品", "./static/Small/skunky.jpg"],
  ["ガソリン", 2, "化学薬品", "./static/Small/petroleum.jpg"],
  ["消毒薬", 2, "化学薬品", "./static/Small/medicinal.jpg"],
  ["塩素", 2, "化学薬品", "./static/Small/citric_acid.jpg"],
  ["苦い薬", 2, "化学薬品", "./static/Small/bitter.jpg"],
  ["防腐剤", 2, "紙／カビ", "./static/Small/medicinal.jpg"],
  ["ブイヨン", 2, "紙／カビ", "./static/Small/brown_roast.jpg"],
  ["獣臭", 2, "紙／カビ", "./static/Small/ashy.jpg"],
  ["カビ臭い土", 2, "紙／カビ", "./static/Small/dark_chocolate.jpg"],
  ["カビ臭い埃", 2, "紙／カビ", "./static/Small/dark_chocolate.jpg"],
  ["カビ／湿気", 2, "紙／カビ", "./static/Small/musty_earthy.jpg"],
  ["木材", 2, "紙／カビ", "./static/Small/phenolic.jpg"],
  ["紙", 2, "紙／カビ", "./static/Small/papery.jpg"],
  ["ダンボール", 2, "紙／カビ", "./static/Small/cardboard.jpg"],
  ["カビたパン", 2, "紙／カビ", "./static/Small/blackberry.jpg"],
];

// ========================================

ReactDOM.render(
  <App flavorNames={FLAVOR_NAMES} />,
  document.getElementById("root")
);
