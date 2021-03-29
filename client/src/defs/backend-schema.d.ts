// tslint:disable
// graphql typescript definitions

declare namespace IGraphqlTypes {
	interface IGraphQLResponseRoot {
		data?: IQuery | IMutation;
		errors?: Array<IGraphQLResponseError>;
	}

	interface IGraphQLResponseError {
		/** Required for all errors */
		message: string;
		locations?: Array<IGraphQLResponseErrorLocation>;
		/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
		[propName: string]: any;
	}

	interface IGraphQLResponseErrorLocation {
		line: number;
		column: number;
	}

	interface IQuery {
		materials: IMaterial[];
		sword: ISword;
		shield: IShield;
		swords: ISword[];
		shields: IShield[];
	}

	interface IMaterial {
		id: string;
		name: string;
		durability: number;
		strength: number;
	}

	interface ISword {
		id: string;
		name: string;
		durability: number;
		attack: number;
		material: IMaterial;
		isUpgraded: boolean;
	}

	interface IShield {
		id: string;
		name: string;
		durability: number;
		protection: number;
		material: IMaterial;
		isUpgraded: boolean;
	}

	interface IMutation {
		addSword: ISword;
		addShield: IShield;
		updateSword: ISword;
		updateShield: IShield;
	}

	interface IAddSwordOnMutationArguments {
		name: string;
		durability: number;
		attack: number;
		materialId: string;
	}

	interface IAddShieldOnMutationArguments {
		name: string;
		durability: number;
		protection: number;
		materialId: string;
	}

	interface IUpgradeSwordOnMutationArguments {
		id: string;
		name: string;
		durability: number;
		attack: number;
	}

	interface IUpgradeShieldOnMutationArguments {
		id: string;
		name: string;
		durability: number;
		protection: number;
	}

	interface IDeleteShieldOnMutationArguments {
		id: string;
	}

	interface IDeleteSwordOnMutationArguments {
		id: string;
	}
}