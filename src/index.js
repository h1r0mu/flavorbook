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
  constructor(name, level, parentName) {
    this.name = name;
    this.level = level;
    this.parentName = parentName;
  }
}

const FLAVOR_NAMES = [
  ["野菜", 0, null],
  ["酸味／発酵", 0, null],
  ["フルーツ", 0, null],
  ["花", 0, null],
  ["甘味", 0, null],
  ["ナッツココア", 0, null],
  ["香辛料", 0, null],
  ["焼き", 0, null],
  ["その他", 0, null],
  ["豆臭い", 1, "野菜"],
  ["植物／野菜", 1, "野菜"],
  ["生野菜", 1, "野菜"],
  ["オリーブオイル", 1, "野菜"],
  ["酒／発酵", 1, "酸味／発酵"],
  ["酸味", 1, "酸味／発酵"],
  ["柑橘類", 1, "フルーツ"],
  ["その他の果実", 1, "フルーツ"],
  ["ドライフルーツ", 1, "フルーツ"],
  ["ベリー", 1, "フルーツ"],
  ["花", 1, "花"],
  ["紅茶", 1, "花"],
  ["甘い香り", 1, "甘味"],
  ["総合的な甘味", 1, "甘味"],
  ["バニラエッセンス", 1, "甘味"],
  ["バニラ", 1, "甘味"],
  ["黒砂糖", 1, "甘味"],
  ["ココア", 1, "ナッツココア"],
  ["ナッツ", 1, "ナッツココア"],
  ["香辛料", 1, "香辛料"],
  ["唐辛子", 1, "香辛料"],
  ["コショウ", 1, "香辛料"],
  ["穀物", 1, "焼き"],
  ["焦げ臭", 1, "焼き"],
  ["タバコ", 1, "焼き"],
  ["パイプタバコ", 1, "焼き"],
  ["化学薬品", 1, "その他"],
  ["紙／カビ", 1, "その他"],
  ["ハーブ", 2, "植物／野菜"],
  ["干し草", 2, "植物／野菜"],
  ["植物", 2, "植物／野菜"],
  ["ホウレンソウ", 2, "植物／野菜"],
  ["生鮮野菜", 2, "植物／野菜"],
  ["さやえんどう", 2, "植物／野菜"],
  ["未成熟な野菜", 2, "植物／野菜"],
  ["発酵しすぎ", 2, "酒／発酵"],
  ["発酵", 2, "酒／発酵"],
  ["ウィスキー", 2, "酒／発酵"],
  ["赤ワイン", 2, "酒／発酵"],
  ["リンゴ酸", 2, "酸味"],
  ["クエン酸", 2, "酸味"],
  ["汗・足のにおい", 2, "酸味"],
  ["ぎんなん臭い", 2, "酸味"],
  ["酢", 2, "酸味"],
  ["酸っぱい香り", 2, "酸味"],
  ["ライム", 2, "柑橘類"],
  ["レモン", 2, "柑橘類"],
  ["オレンジ", 2, "柑橘類"],
  ["グレープフルーツ", 2, "柑橘類"],
  ["洋梨", 2, "その他の果実"],
  ["桃", 2, "その他の果実"],
  ["青リンゴ", 2, "その他の果実"],
  ["マスカット", 2, "その他の果実"],
  ["パイナップル", 2, "その他の果実"],
  ["ザクロ", 2, "その他の果実"],
  ["チェリー", 2, "その他の果実"],
  ["ココナッツ", 2, "その他の果実"],
  ["プルーン", 2, "ドライフルーツ"],
  ["レーズン", 2, "ドライフルーツ"],
  ["ストロベリー", 2, "ベリー"],
  ["ブルーベリー", 2, "ベリー"],
  ["ラズベリー", 2, "ベリー"],
  ["ブラックベリー", 2, "ベリー"],
  ["ジャスミン", 2, "花"],
  ["ローズ", 2, "花"],
  ["カモミール", 2, "花"],
  ["ハチミツ", 2, "黒砂糖"],
  ["キャラメリゼ", 2, "黒砂糖"],
  ["メイプルシロップ", 2, "黒砂糖"],
  ["シロップ", 2, "黒砂糖"],
  ["ダークチョコレート", 2, "ココア"],
  ["チョコレート", 2, "ココア"],
  ["アーモンド", 2, "ナッツ"],
  ["ヘーゼルナッツ", 2, "ナッツ"],
  ["ピーナッツ", 2, "ナッツ"],
  ["クローブ", 2, "香辛料"],
  ["シナモン", 2, "香辛料"],
  ["ナツメグ", 2, "香辛料"],
  ["アニス", 2, "香辛料"],
  ["麦芽", 2, "穀物"],
  ["穀物", 2, "穀物"],
  ["焦げ豆", 2, "焦げ臭"],
  ["煙", 2, "焦げ臭"],
  ["灰っぽい", 2, "焦げ臭"],
  ["燃えたゴム臭", 2, "焦げ臭"],
  ["ゴム", 2, "化学薬品"],
  ["スカンクの悪臭", 2, "化学薬品"],
  ["ガソリン", 2, "化学薬品"],
  ["消毒薬", 2, "化学薬品"],
  ["塩素", 2, "化学薬品"],
  ["苦い薬", 2, "化学薬品"],
  ["防腐剤", 2, "紙／カビ"],
  ["ブイヨン", 2, "紙／カビ"],
  ["獣臭", 2, "紙／カビ"],
  ["カビ臭い土", 2, "紙／カビ"],
  ["カビ臭い埃", 2, "紙／カビ"],
  ["カビ／湿気", 2, "紙／カビ"],
  ["木材", 2, "紙／カビ"],
  ["紙", 2, "紙／カビ"],
  ["ダンボール", 2, "紙／カビ"],
  ["カビたパン", 2, "紙／カビ"],
];

// ========================================

ReactDOM.render(
  <App flavorNames={FLAVOR_NAMES} />,
  document.getElementById("root")
);
